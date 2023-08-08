const express = require("express");
const app = express();
let posts = []; //게시글 리스트로 사용할 posts에 빈 리스트 할당

/**
 * JSON 미들웨어 활성화 = use()
 * req.body를 사용하려면 JSON 미들웨어를 사용해야 함
 * 사용하지 않으면 undefined로 반환 
 */
app.use(express.json());

/**
* POST 요청 시 컨텐츠 타입이 application/x-www-form-urlencoded인 경우 파싱 
* application/x-www-form-urlencoded : key&value 데이터
* JSON 미들웨어와 함께 사용
*/
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.json(posts);
});

app.post("/posts", (req,res) => {
    const {title, name, text} = req.body; //body 데이터를 변수에 할당 @requestBody같은?

    //새로운 게시글 추가
    posts.push({id: posts.length + 1, title, name, text, createdAt: Date()});
    res.json({title, name, text});
});

app.delete("/posts/:id", (req,res) => {
    const id = req.params.id;
    
    const filteredPosts = posts.filter((post) => post.id !== +id); //글 삭제, +id: 문자열인 id를 Integer로
    const isLengthChanged = posts.length !== filteredPosts.length; //삭제 확인

    posts = filteredPosts;
    if(isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("Welcome posts START!");
});