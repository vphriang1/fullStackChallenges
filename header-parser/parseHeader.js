function parseHeader(req) {
  var object = {};
  console.log(req.rawHeaders);
  object.ipaddress = req.get('x-forwarded-for').split(',')[0];
  object.languages = req.get('accept-language');
  object.software = req.get('user-agent');

  return object;
}
module.exports = parseHeader;
