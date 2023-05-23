import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { AlbumModule } from './album/album.module';
import { NotFoundExceptionFilter } from './exceptions/not-found.exceptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      renderPath: path.resolve(__dirname, 'static'),
    }),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
  providers: [NotFoundExceptionFilter],
})
export class AppModule {}
