import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS ayarları - genişletilmiş
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://derece1.vercel.app', // Frontend domain
      'null', // Local HTML dosyaları için
      /^https:\/\/.*\.vercel\.app$/, // Tüm Vercel subdomains
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
