import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Track } from '../../track/schemas/track.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema({ versionKey: false })
export class Album {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
