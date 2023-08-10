const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios.get(url) //GET 요청
        .then((result) => { 
            if(result.status != 200) {
                throw new Error("요청에 실패했습니다.");
            }

            if(result.data) {
                return result.data;
            }

            throw new Error("데이터가 없습니다.");
        })
        .then((data) => {
            if(!data.articleList || data.articleList.size == 0) {
                throw new Error("데이터가 없습니다.");
            }
            return data.articleList; //영화 리스트 반환
        })
        .then((articles) => {
            return articles.map((article, idx) => { //제목과 순위로 분리
                return {title: article.title, rank: idx+1};
            });
        })
        .then((results) => {
            for(let movieInfo of results) {
                console.log(`[${movieInfo.rank}위] ${movieInfo.title}`); //리스트 출력
            }
        })
        .catch((err) => { //중간에 발생한 에러처리
            console.log("<<에러발생>>");
            console.error(err);
        });