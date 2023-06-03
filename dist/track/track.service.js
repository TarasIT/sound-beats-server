"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const track_schema_1 = require("./schemas/track.schema");
const comment_schema_1 = require("./schemas/comment.schema");
const file_service_1 = require("../file/file.service");
let TrackService = class TrackService {
    constructor(trackModel, commentModel, fileService) {
        this.trackModel = trackModel;
        this.commentModel = commentModel;
        this.fileService = fileService;
    }
    async create(createTrackDto, picture, audio) {
        try {
            const audioPath = this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
            const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
            const createdTrack = await this.trackModel.create(Object.assign(Object.assign({}, createTrackDto), { listens: 0, audio: audioPath, picture: picturePath }));
            if (!createdTrack) {
                throw new common_1.HttpException('could not create a track', common_1.HttpStatus.NOT_FOUND);
            }
            return createdTrack;
        }
        catch (e) {
            throw new common_1.HttpException(`create track error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(limit = 20, page = 0) {
        try {
            const tracks = await this.trackModel
                .find()
                .skip(Number(page))
                .limit(Number(limit));
            if (tracks.length === 0) {
                throw new common_1.HttpException('no tracks found', common_1.HttpStatus.NOT_FOUND);
            }
            return tracks;
        }
        catch (e) {
            throw new common_1.HttpException(`get tracks error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(id) {
        try {
            const track = await this.trackModel.findById(id);
            if (!track) {
                throw new common_1.HttpException('no track found', common_1.HttpStatus.NOT_FOUND);
            }
            return track;
        }
        catch (e) {
            throw new common_1.HttpException(`get track error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const deletedTrack = await this.trackModel.findByIdAndDelete(id);
            if (!deletedTrack) {
                throw new common_1.HttpException('no track found', common_1.HttpStatus.NOT_FOUND);
            }
            return deletedTrack._id;
        }
        catch (e) {
            throw new common_1.HttpException(`delete track error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listen(id) {
        try {
            const track = await this.trackModel.findById(id);
            if (!track) {
                throw new common_1.HttpException('no track found', common_1.HttpStatus.NOT_FOUND);
            }
            track.listens += 1;
            track.save();
        }
        catch (e) {
            throw new common_1.HttpException(`add listen error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async search(query) {
        try {
            const tracks = await this.trackModel.find({
                name: { $regex: new RegExp(query, 'i') },
            });
            if (tracks.length === 0) {
                throw new common_1.HttpException(`no tracks by query "${query}"`, common_1.HttpStatus.NOT_FOUND);
            }
            return tracks;
        }
        catch (e) {
            throw new common_1.HttpException(`search track error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addComment(createCommentDto) {
        try {
            console.log('createCommentDto.track ', createCommentDto.track);
            const track = await this.trackModel.findById(createCommentDto.track);
            console.log('track ', track);
            if (!track) {
                throw new common_1.HttpException('no track found', common_1.HttpStatus.NOT_FOUND);
            }
            const comment = await this.commentModel.create(Object.assign({}, createCommentDto));
            if (!comment) {
                throw new common_1.HttpException('could not create a comment', common_1.HttpStatus.NOT_FOUND);
            }
            track.comments.push(comment);
            await track.save();
            return comment;
        }
        catch (e) {
            throw new common_1.HttpException(`add comment error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        file_service_1.FileService])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map