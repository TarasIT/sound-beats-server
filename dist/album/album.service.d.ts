/// <reference types="multer" />
import { Model } from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService } from 'src/file/file.service';
import { TrackService } from 'src/track/track.service';
import { AddTrackToAlbumDto } from './dto/add-track-to-album.dto';
import { ObjectId } from 'mongodb';
export declare class AlbumService {
    private albumModel;
    private trackService;
    private fileService;
    constructor(albumModel: Model<Album>, trackService: TrackService, fileService: FileService);
    getAll(limit?: number, page?: number): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto, picture: Express.Multer.File): Promise<Album>;
    addTrack(addTrackToAlbumDto: AddTrackToAlbumDto): Promise<Album>;
    getOne(id: ObjectId): Promise<Album>;
    delete(id: ObjectId): Promise<ObjectId>;
}
