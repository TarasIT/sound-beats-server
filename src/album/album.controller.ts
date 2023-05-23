import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { IFileUpload } from '../types/file-upload.interface';
import { ObjectId } from 'mongodb';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Album[]> {
    return this.albumService.getAll(limit, page);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async create(
    @UploadedFiles() files: IFileUpload,
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    const createdAlbum = await this.albumService.create(
      createAlbumDto,
      files.picture[0],
    );
    return createdAlbum;
  }

  @Post('track')
  async addTrack(
    @Body() addTrackToAlbumDto: AddTrackToAlbumDto,
  ): Promise<Album> {
    return this.albumService.addTrack(addTrackToAlbumDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<Album> {
    return this.albumService.getOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.albumService.delete(id);
  }
}
