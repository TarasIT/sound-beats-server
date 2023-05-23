import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from 'src/file/file.service';
import { TrackService } from 'src/track/track.service';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private trackService: TrackService,
    private fileService: FileService,
  ) {}

  async getAll(limit: number = 20, page: number = 0): Promise<Album[]> {
    try {
      const albums = await this.albumModel
        .find()
        .skip(Number(page))
        .limit(Number(limit));
      if (albums.length === 0) {
        throw new HttpException('no albums found', HttpStatus.NOT_FOUND);
      }
      return albums;
    } catch (e) {
      throw new HttpException(
        `get albums error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createAlbumDto: CreateAlbumDto,
    picture: Express.Multer.File,
  ): Promise<Album> {
    try {
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const createdAlbum = await this.albumModel.create({
        ...createAlbumDto,
        picture: picturePath,
      });
      if (!createdAlbum) {
        throw new HttpException('album create error', HttpStatus.NOT_FOUND);
      }
      return createdAlbum;
    } catch (e) {
      throw new HttpException(
        `create album error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addTrack(addTrackToAlbumDto: AddTrackToAlbumDto): Promise<Album> {
    try {
      const album = await this.albumModel.findById(addTrackToAlbumDto.album);
      const track = await this.trackService.getOne(addTrackToAlbumDto.track);
      if (!album) {
        throw new HttpException('no album found', HttpStatus.NOT_FOUND);
      }
      if (!track) {
        throw new HttpException('no track found', HttpStatus.NOT_FOUND);
      }
      album.tracks.push(track);
      await album.save();
      return album;
    } catch (e) {
      throw new HttpException(
        `add track to album error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: ObjectId): Promise<Album> {
    try {
      const album = await this.albumModel.findById(id);
      if (!album) {
        throw new HttpException('no album found', HttpStatus.NOT_FOUND);
      }
      return album;
    } catch (e) {
      throw new HttpException(
        `get album error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const deletedAlbum = await this.albumModel.findByIdAndDelete(id);
      if (!deletedAlbum) {
        throw new HttpException('no album found', HttpStatus.NOT_FOUND);
      }
      return deletedAlbum._id;
    } catch (e) {
      throw new HttpException(
        `delete album error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
