import { ObjectId } from 'mongodb';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { Track } from './schemas/track.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { IFileUpload } from '../types/file-upload.interface';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    create(files: IFileUpload, createTrackDto: CreateTrackDto): Promise<Track>;
    getAll(limit: number, page: number): Promise<Track[]>;
    search(query: string): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<ObjectId>;
    addComment(createCommentDto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
}
