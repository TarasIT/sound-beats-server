import { ObjectId } from 'mongodb';
export declare class AddTrackToAlbumDto {
    readonly album: ObjectId;
    readonly track: ObjectId;
}
