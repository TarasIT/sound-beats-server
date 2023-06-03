/// <reference types="multer" />
import { Model } from 'mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongodb';
import { FileService } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class TrackService {
    private readonly trackModel;
    private readonly commentModel;
    private fileService;
    constructor(trackModel: Model<Track>, commentModel: Model<Comment>, fileService: FileService);
    create(createTrackDto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track>;
    getAll(limit?: number, page?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<ObjectId>;
    listen(id: ObjectId): Promise<void>;
    search(query: string): Promise<Track[]>;
    addComment(createCommentDto: CreateCommentDto): Promise<Comment>;
}
