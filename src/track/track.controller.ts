import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { Track } from './schemas/track.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { IFileUpload } from '../types/file-upload.interface';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: IFileUpload,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    const { picture, audio } = files;
    const createdTrack = await this.trackService.create(
      createTrackDto,
      picture[0],
      audio[0],
    );
    return createdTrack;
  }

  @Get()
  async getAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Track[]> {
    return this.trackService.getAll(limit, page);
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.trackService.delete(id);
  }

  @Post('comment')
  addComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.trackService.addComment(createCommentDto);
  }

  @Post('listen/:id')
  async listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
