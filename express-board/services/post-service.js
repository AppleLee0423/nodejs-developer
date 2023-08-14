const paginator = require("../utils/paginator");
const {ObjectID, ObjectId} = require("mongodb");

//글 목록
async function list(collection, page, search) {
    const perPage = 10;
    const query = {title: new RegExp(search, "i")}; //title이 search와 부분일치 하는지 확인
    /**
     * limit는 10개씩 가져온다는 의미, skip은 설정된 갯수만큼 건너뜀, 생성일 역순 정렬
     */
    const cursor = collection.find(query, {limit: perPage, skip: (page-1)*perPage}).sort({createdAt: -1,});

    const totalCount = await collection.count(query);
    const posts = await cursor.toArray(); //데이터를 리스트로 변경

    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];
}

//패스워드는 노출 할 필요 없으므로 빼줌
const projectionOption = {
    //projection: 결과값에서 일부만 가져올 때 사용
    projection: {
        password: 0,
        "comments.password": 0,
    },
};

//글 상세내용
async function getDetailPost(collection, id) {
    //조회 시 조회수 증가, $inc: increase
    return await collection.findOneAndUpdate({_id: ObjectId(id)}, {$inc: {hits: 1}}, projectionOption);
}

//새 글 작성
async function writePost(collection, post) {
    /**
     * 조회수, 생성일자(ISO포맷)
     */
    post.hits = 0;
    post.createdAt = new Date().toISOString();
    return await collection.insertOne(post);
}

async function getPostByIdAndPassword(collection, {id, password}) {
    return await collection.findOne({_id: ObjectId(id), password: password}, projectionOption);
}

//ID로 데이터 가져오기
async function getPostById(collection, id) {
    return await collection.findOne({_id: ObjectId(id)}, projectionOption);
}

//게시글 수정
async function updatePost(collection, id, post) {
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };

    return await collection.updateOne({_id: ObjectId(id), toUpdatePost});
}

module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostById,
    getPostByIdAndPassword,
    updatePost,
};