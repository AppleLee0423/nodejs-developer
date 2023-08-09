const http = require("http"); // http 객체 생성

let count = 0;

// 노드 서버 객체 생성
const server = http.createServer((req, res) => { //서버 객체 생성
  log(count); //카운트 1 증가
  res.statusCode = 200; //결과값 200
  res.setHeader("Content-Type", "text/plain"); //헤더 설정
  res.write("hello\n"); //응답값 설정
  // prettier-ignore
  setTimeout(() => {
    res.end("Node.js"); //출력값
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

server.listen(8000); //8000번 포트로 서버 실행