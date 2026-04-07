import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS ayarları
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://derece1.vercel.app', // Frontend domain'inizi buraya ekleyin
      'https://your-frontend-domain.com', // Production domain'inizi buraya ekleyin
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
