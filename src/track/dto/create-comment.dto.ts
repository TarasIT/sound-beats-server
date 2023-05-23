import { ObjectId } from 'mongodb';

export class CreateCommentDto {
  readonly username: string;
  readonly text: string;
  readonly track: ObjectId;
}
