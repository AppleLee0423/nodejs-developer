async function writePost(collection, post) {
    /**
     * 조회수, 생성일자(ISO포맷)
     */
    post.hits = 0;
    post.createdAt = new Date().toISOString();
    return await collection.insertOne(post);
}

module.exports = {
    writePost,
};