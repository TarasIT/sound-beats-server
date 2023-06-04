require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
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
