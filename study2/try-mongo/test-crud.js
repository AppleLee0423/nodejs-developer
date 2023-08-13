const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ld210:Test880423@cluster0.dik9vhw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {useNewUrlParser: true});

async function main() {
    try {
        await client.connect();
        console.log('MongoDB 접속 성공');

        //test 데이터베이스의 person 컬렉션 가져오기
        const collection = client.db('test').collection('person');

        //문서 하나 추가
        await collection.insertOne({name: 'CJ', age: 35});
        console.log('문서 추가 완료');

        //문서 찾기
        const documents = await collection.find({name: 'CJ'}).toArray();
        console.log('찾은 문서: ', documents);

        //문서 갱신하기
        await collection.updateOne({name: 'CJ'}, {$set: {age: 36}});
        console.log('문서 업데이트');

        //갱신된 문서 확인하기
        const updatedDocuments = await collection.find({name: 'CJ'}).toArray();
        console.log('갱신된 문서: ', updatedDocuments);

        //문서 삭제하기
        //await collection.deleteOne({name: 'CJ'});
        //console.log('문서 삭제');

        //연결 해제
        await client.close();
    } catch (error) {
        console.log(error);
    }
}

main();