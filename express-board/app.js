const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");

const postService = require("./services/post-service");

//req.body 사용하기 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars",
            handlebars.create({
                helpers: require("./configs/handlebars-helpers"),
            }).engine,
        ); // 템플릿 엔진 설정
app.set("view engine", "handlebars"); //웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); //뷰 디렉터리를 views로 설정

//라우터 설정
app.get("/", (req, res) => {
    res.render("home", {title: "테스트 게시판", message: "만나서 반갑습니다!"});
});

app.get("/write", (req, res) => {
    res.render("write", {title: "테스트 게시판"});
});

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "테스트 게시판",
    });
});

//새 글 작성
app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

let collection;
app.listen(3000, async () => {
    console.log("Server started");
    const mongoClient = await mongodbConnection();
    //mongoClient.db()로 DB(테이블) 선택, collection()으로 컬렉션 선택 후 할당
    collection = mongoClient.db("board").collection("post");
    console.log("MongoDB connected");
});