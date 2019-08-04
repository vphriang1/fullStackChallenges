import { ANS } from '../constants/action-types';

export default function sum(payload) {
  return { type: ANS, payload };
}
