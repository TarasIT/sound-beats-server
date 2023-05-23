require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}`),
    );
  } catch (e) {
    console.error(e);
  }
};
start();
