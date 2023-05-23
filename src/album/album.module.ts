import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from 'src/album/schemas/album.schema';
import { FileService } from 'src/file/file.service';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { TrackService } from 'src/track/track.service';
import { Comment, CommentSchema } from 'src/track/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, FileService],
})
export class AlbumModule {}
