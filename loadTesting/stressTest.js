import http from 'k6/http';
import { sleep } from 'k6';


const myURL = 'http://localhost:3000'
let random = Math.floor(Math.random() * (1000000 - 900000) + 900000);

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 2000 },
    { duration: '30s', target: 2000 },
    { duration: '1m', target: 0 },
  ]
};


export default function () {
  let response = http.batch([
    ['GET', `${myURL}/reviews/?product_id=${random}`]

  ]);
  sleep(1);
}
// ['GET', `${myURL}/reviews/meta/${random}`],