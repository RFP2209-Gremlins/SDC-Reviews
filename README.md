# SDC-Reviews

Built back end system to replace outdated API that can scale to meet traffic demands and have faster response rates.

Requirements:
<li>Throughput:100RPS</li>
<li>Latency: 100ms</li>
<li>Error Rate: <1%</li>
<br>

Built with:<br>
<a href="">![-Node](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)</a>
<a href="">![-Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)</a>
<a href="">![-Postgresql](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)</a>
<a href="">![-Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white)</a>

Procedure:
- cleaned and loaded millions of entries of data into PostgreSQL
- Created queries using aggregate functions to build response object
- tested locally using K6 (1000 RPS, 12ms latency, 0% ER)
- Deployed database and server using AWS EC2 instances
- Tested in depolyment with Loader.io
- Load balanaced and implemented caching using NGINX

<img width="1278" alt="Screen Shot 2022-11-14 at 9 59 28 PM" src="https://user-images.githubusercontent.com/109768733/206535052-f6557445-d1d0-493b-b5d8-7fd147439763.png">

