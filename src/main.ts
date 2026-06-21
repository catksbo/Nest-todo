import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe ({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
  }), );

  // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('API documentation for Todo Application')
      .setVersion('1.0')
       .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
