import { ObjectId } from 'mongodb';

export class CreateAlbumDto {
  readonly name: string;
  readonly author: string;
}
