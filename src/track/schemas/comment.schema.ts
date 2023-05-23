import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Track } from './track.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false })
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: ObjectId, ref: 'Track' })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
