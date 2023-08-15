import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

//NestJS를 시작하는 함수
async function bootstrap() {
    //NestFactory로 NestApplication 생성
    const app = await NestFactory.create(HelloModule);

    await app.listen(3000, () => {console.log("SERVER STARTED!");});
}

bootstrap();