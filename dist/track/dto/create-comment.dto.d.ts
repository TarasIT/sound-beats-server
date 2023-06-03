import { ObjectId } from 'mongodb';
export declare class CreateCommentDto {
    readonly username: string;
    readonly text: string;
    readonly track: ObjectId;
}
