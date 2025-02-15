import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Chỉ định HTTP methods được phép
  })

  // app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
