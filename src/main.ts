require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';

const createDirectory = () => {
  const audioPath = path.resolve(__dirname, 'static', 'audio');
  const imagePath = path.resolve(__dirname, 'static', 'image');
  fs.mkdirSync(audioPath, { recursive: true });
  fs.mkdirSync(imagePath, { recursive: true });
};

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    createDirectory();
    const PORT = process.env.PORT || 4000;
    await app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}`),
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
start();
