const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const shortid = require('shortid');

mongoose.connect(process.env.URI, {useNewUrlParser: true} );

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

var exerciseClass = mongoose.model('exerciseLog', new mongoose.Schema({username: String, _id: String, log: []}));

// create a new user
app.post('/api/exercise/new-user', function(req, res) {
  exerciseClass.findOne({username: req.body.username}, function(err, data) {
    if (err) console.error(err);
    if(data==null) {
      // create user
      var id = shortid.generate();
      var entry = new exerciseClass({username: req.body.username, _id: id, log:[]});
      entry.save(function(err, data) {
        if(err) console.error(err);
        // display user
        res.json({username: req.body.username, id: shortid.generate()});
      });

    } else {
        res.send("username already taken")
    }
  });
});

// get all users
app.get('/api/exercise/users', (req, res) => {
  exerciseClass.find({}, function(err, data) {
    if (err) console.error(err);
    res.json(data);
    
  }).select('username _id');
});

// add an exercise
app.post('/api/exercise/add', function(req, res) {
  console.log(req.body.userId);
  exerciseClass.findOne({_id: req.body.userId}, function(err, data) {
    if (err) console.error(err);
    if(data == null) {
      res.send('unknown user id');
    } else {
      console.log('data: '+data);
      // update the schema
      var date = new Date(req.body.date);

      if (isNaN(date)) {
         date = new Date(); 
      } else {
        date = date;
      }
      
     
     data.log.push({description: req.body.description, duration: req.body.duration, data: date});
     console.log(data);
      
      data.save(function(err, data){
        if(err) console.error(err);
        console.log('it saved');
              res.json({username: data.username, description: req.body.description, duration: req.body.duration, _id: data._id, date: date});
      });
    }
  });
});

  //var date = new Date('1992/08/133');
  //console.log(date.getDate());


function plainQuery(id, req, res) {
  console.log('in plainQuery function');
    
  exerciseClass.find({_id: id}).select('username _id log').lean().exec(function(err, data) {
    if (err) console.error(err);

    // console.log(data);
    if (data==null) {
      res.send('unknown user id');
    } else {

      data = data.pop();
      console.log(data);

      data.log = data.log.slice((req.query.limit>data.log.length -1)?0:-req.query.limit);
      data.count = data.log.length;
      res.json(data);
    }
  });
}

// part 4 and 5
app.get('/api/exercise/log', function(req, res) {
 
  if (typeof req.query.from !== undefined && typeof (req.query.to) !== undefined) {
        const from = new Date(req.query.from);
        if (!isNaN(from)) {

          const to = new Date(req.query.to);
          if (!isNaN(to)) {
              exerciseClass.aggregate([{
                $match: {
                    "_id": req.query.userId
                }
              },
        
              {
                $project: {
                  "username": 1, "id": 1,
                  "from": req.query.from,
                  'to': req.query.to,
                  "log": {
                    $slice: [{
                      $filter: {
                        "input": "$log",
                        "as": "date",
                        "cond": {
                          $and: [
                            {$gt: ["$$date.data", new Date(req.query.from)]},
                            {$lte: ["$$date.data", new Date(req.query.to)]},
                          ],

                        }, // end of cond
                      }}, (req.query.limit) ? parseInt(req.query.limit) : "$$date.data".length ],      
                  }, // end of log
                  "count": {$size: {
                                        $slice: [{
                      $filter: {
                        "input": "$log",
                        "as": "date",
                        "cond": {
                          $and: [
                            {$gt: ["$$date.data", new Date(req.query.from)]},
                            {$lte: ["$$date.data", new Date(req.query.to)]},
                          ],

                        }, // end of cond
                      }}, (req.query.limit) ? parseInt(req.query.limit) : "$$date.data".length ]
                  }} 
                }
              }], function(err, data) {
                console.log(data);
                res.json(data.pop());
              });
          } else {
            plainQuery(req.query.userId, req, res);
          }
        } else {
          plainQuery(req.query.userId, req, res);
        }
       
      } else {
        plainQuery(req.query.userId, req, res);
      }
  
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'});
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage
//
  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
