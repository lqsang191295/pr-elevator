import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://pr-elevator.vercel.app', 'https://pr-elevator-client.vercel.app/'],
    methods: 'GET, PUT, POST, DELETE'
  })

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
