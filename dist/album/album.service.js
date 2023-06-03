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
exports.AlbumService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const album_schema_1 = require("./schemas/album.schema");
const file_service_1 = require("../file/file.service");
const track_service_1 = require("../track/track.service");
let AlbumService = class AlbumService {
    constructor(albumModel, trackService, fileService) {
        this.albumModel = albumModel;
        this.trackService = trackService;
        this.fileService = fileService;
    }
    async getAll(limit = 20, page = 0) {
        try {
            const albums = await this.albumModel
                .find()
                .skip(Number(page))
                .limit(Number(limit));
            if (albums.length === 0) {
                throw new common_1.HttpException('no albums found', common_1.HttpStatus.NOT_FOUND);
            }
            return albums;
        }
        catch (e) {
            throw new common_1.HttpException(`get albums error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createAlbumDto, picture) {
        try {
            const picturePath = this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
            const createdAlbum = await this.albumModel.create(Object.assign(Object.assign({}, createAlbumDto), { picture: picturePath }));
            if (!createdAlbum) {
                throw new common_1.HttpException('album create error', common_1.HttpStatus.NOT_FOUND);
            }
            return createdAlbum;
        }
        catch (e) {
            throw new common_1.HttpException(`create album error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addTrack(addTrackToAlbumDto) {
        try {
            const album = await this.albumModel.findById(addTrackToAlbumDto.album);
            const track = await this.trackService.getOne(addTrackToAlbumDto.track);
            if (!album) {
                throw new common_1.HttpException('no album found', common_1.HttpStatus.NOT_FOUND);
            }
            if (!track) {
                throw new common_1.HttpException('no track found', common_1.HttpStatus.NOT_FOUND);
            }
            album.tracks.push(track);
            await album.save();
            return album;
        }
        catch (e) {
            throw new common_1.HttpException(`add track to album error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(id) {
        try {
            const album = await this.albumModel.findById(id);
            if (!album) {
                throw new common_1.HttpException('no album found', common_1.HttpStatus.NOT_FOUND);
            }
            return album;
        }
        catch (e) {
            throw new common_1.HttpException(`get album error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const deletedAlbum = await this.albumModel.findByIdAndDelete(id);
            if (!deletedAlbum) {
                throw new common_1.HttpException('no album found', common_1.HttpStatus.NOT_FOUND);
            }
            return deletedAlbum._id;
        }
        catch (e) {
            throw new common_1.HttpException(`delete album error: ${e.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(album_schema_1.Album.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        track_service_1.TrackService,
        file_service_1.FileService])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map