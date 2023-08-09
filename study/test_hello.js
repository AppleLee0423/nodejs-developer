import http from "k6/http";

export const option = { //테스트 옵션
    vus: 100, //가상유저수
    duration: "10s", //테스트 시간 설정
};

export default function(){
    http.get("http://localhost:8000"); //테스트 사용함수 지정
}