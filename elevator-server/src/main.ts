import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['*', 'https://pr-elevator-client.vercel.app'],
    methods: 'GET, PUT, POST, DELETE'
  })

  // app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
