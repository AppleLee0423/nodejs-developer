const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");

const postService = require("./services/post-service");
const ObjectID = require("mongodb");

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
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; //현재 페이지 데이터
    const search = req.query.search || ""; //검색어 데이터
    try {
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", {title: "EXPRESS 게시판", search, paginator, posts});
    } catch (error) {
        console.error(error);
        res.render("home", {title: "EXPRESS 게시판"});
    }
});

app.get("/write", (req, res) => {
    res.render("write", {title: "EXPRESS 게시판", mode: "create"});
});

app.get("/modify/:id", async (req, res) => {
    const {id} = req.params.id;
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "EXPRESS 게시판", mode: "modify", post});
});

app.post("/modify/", async (req, res) => {
    const {id, title, writer, password, content} = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdAt: new Date().toISOString(),
    };

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "EXPRESS 게시판",
        post: result.value,
    });
});

//새 글 작성
app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

//패스워드 체크
app.post("/check-password", async (req, res) => {
    const {id, password} = req.body;

    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if(!post) {
        return res.status(404).json({isExist: false});
    } else {
        return res.json({isExist: true});
    }
});

app.delete("/delete", async (req, res) => {
    const {id, password} = req.body;

    try {
        const result = await collection.deleteOne({_id: ObjectID(id), password: password});

        if(result.deleteCount !== 1) {
            console.log("삭제 실패");
            return res.json({isSuccess: false})
        }
        return res.json({isSuccess: true})
    } catch (error) {
        console.error(error);
        return res.json({isSuccess: false});
    }
});

let collection;
app.listen(3000, async () => {
    console.log("Server started");
    const mongoClient = await mongodbConnection();
    //mongoClient.db()로 DB(테이블) 선택, collection()으로 컬렉션 선택 후 할당
    collection = mongoClient.db("board").collection("post");
    console.log("MongoDB connected");
});