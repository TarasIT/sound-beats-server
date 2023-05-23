import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongodb';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<Track>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}

  async create(
    createTrackDto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    try {
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const createdTrack = await this.trackModel.create({
        ...createTrackDto,
        listens: 0,
        audio: audioPath,
        picture: picturePath,
      });
      if (!createdTrack) {
        throw new HttpException(
          'could not create a track',
          HttpStatus.NOT_FOUND,
        );
      }
      return createdTrack;
    } catch (e) {
      throw new HttpException(
        `create track error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(limit = 20, page = 0): Promise<Track[]> {
    try {
      const tracks = await this.trackModel
        .find()
        .skip(Number(page))
        .limit(Number(limit));
      if (tracks.length === 0) {
        throw new HttpException('no tracks found', HttpStatus.NOT_FOUND);
      }
      return tracks;
    } catch (e) {
      throw new HttpException(
        `get tracks error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: ObjectId): Promise<Track> {
    try {
      const track = await this.trackModel.findById(id);
      if (!track) {
        throw new HttpException('no track found', HttpStatus.NOT_FOUND);
      }
      return track;
    } catch (e) {
      throw new HttpException(
        `get track error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const deletedTrack = await this.trackModel.findByIdAndDelete(id);
      if (!deletedTrack) {
        throw new HttpException('no track found', HttpStatus.NOT_FOUND);
      }
      return deletedTrack._id;
    } catch (e) {
      throw new HttpException(
        `delete track error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listen(id: ObjectId) {
    try {
      const track = await this.trackModel.findById(id);
      if (!track) {
        throw new HttpException('no track found', HttpStatus.NOT_FOUND);
      }
      track.listens += 1;
      track.save();
    } catch (e) {
      throw new HttpException(
        `add listen error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async search(query: string): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find({
        name: { $regex: new RegExp(query, 'i') },
      });
      if (tracks.length === 0) {
        throw new HttpException(
          `no tracks by query "${query}"`,
          HttpStatus.NOT_FOUND,
        );
      }
      return tracks;
    } catch (e) {
      throw new HttpException(
        `search track error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      console.log('createCommentDto.track ', createCommentDto.track);
      const track = await this.trackModel.findById(createCommentDto.track);
      console.log('track ', track);

      if (!track) {
        throw new HttpException('no track found', HttpStatus.NOT_FOUND);
      }
      const comment = await this.commentModel.create({ ...createCommentDto });
      if (!comment) {
        throw new HttpException(
          'could not create a comment',
          HttpStatus.NOT_FOUND,
        );
      }
      track.comments.push(comment);
      await track.save();
      return comment;
    } catch (e) {
      throw new HttpException(
        `add comment error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
