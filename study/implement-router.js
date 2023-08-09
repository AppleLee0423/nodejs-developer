const http = require("http");
const url = require("url"); //URL 모듈을 로딩

http.createServer((req,res) => {
    const path = url.parse(req.url, true).pathname; //패스명 할당, 쿼리 스트링을 함께 파싱할 경우 true
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if(path === "/user"){
        //res.end("[user] name : nady, age: 30"); //user 결과값 설정
        user(req,res);
    } else if(path === "/feed"){
        /*
        res.end(
            `<ul>
                <li>picture1</li>
                <li>picture2</li>
                <li>picture3</li>
            </ul>`
        ); //feed 결과값 설정
        */
       feed(req,res);
    } else {
        /*
        res.statusCode = 404;
        res.end("404 page not found"); //예외처리
        */
       notFound(req,res);
    }
}).listen("3000", () => console.log("라우터를 만들어보자!"));

const user = (req,res) => {
    const userInfo = url.parse(req.url, true).query; //쿼리 스트링 데이터 할당
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req,res) => {
    res.end(
        `<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>`
    );
};

const notFound = (req,res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};