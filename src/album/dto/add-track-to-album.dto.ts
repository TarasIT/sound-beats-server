import { ObjectId } from 'mongodb';

export class AddTrackToAlbumDto {
  readonly album: ObjectId;
  readonly track: ObjectId;
}
