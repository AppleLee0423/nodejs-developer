const paginator = require("../utils/paginator");

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

//새 글 작성
async function writePost(collection, post) {
    /**
     * 조회수, 생성일자(ISO포맷)
     */
    post.hits = 0;
    post.createdAt = new Date().toISOString();
    return await collection.insertOne(post);
}

module.exports = {
    list,
    writePost,
};