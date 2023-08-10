const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => { //Promise 객체 반환
        if(DB.length > oldDBSize) {
            resolve(user); //성공 시 유저 정보
        } else {
            reject(new Error("Save DB Error!")); //실패 시 에러 메세지
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`Success register ${user.name}`);
    });
}

function registerByPromise(user) {
    //비동기 호출이지만 순서를 고려하여 작성해야함
    const result = saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error));
    //완료 되지 않은 상태는 pending
    console.log(result);
    return result;
}

const myUser = {email: "lee@test.com", password: "1234", name: "이순신"};

/*
const result = registerByPromise(myUser);

//Promise 결과값은 then() 메서드에 함수를 넣어 확인
result.then(console.log);
*/

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);