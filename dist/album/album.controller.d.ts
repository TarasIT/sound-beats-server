import { AlbumService } from './album.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { IFileUpload } from '../types/file-upload.interface';
import { ObjectId } from 'mongodb';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAll(limit: number, page: number): Promise<Album[]>;
    create(files: IFileUpload, createAlbumDto: CreateAlbumDto): Promise<Album>;
    addTrack(addTrackToAlbumDto: AddTrackToAlbumDto): Promise<Album>;
    getOne(id: ObjectId): Promise<Album>;
    delete(id: ObjectId): Promise<ObjectId>;
}
