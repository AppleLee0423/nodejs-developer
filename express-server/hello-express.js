const express = require("express"); //express 모듈 호출
const app = express(); //express 초기화 후 app에 할당
const port = 3000;

app.get("/", (req,res) => { // path가 "/"이며, get 요청을 받음
    res.set({"Content-Type": "text/html; charset=utf-8"}); //헤더 설정
    res.end("헬로 EXPRESS");
});

app.listen(port, () => {
    console.log('START SERVER : use ${port}');
});