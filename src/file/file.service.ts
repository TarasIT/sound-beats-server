import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      createDirectories(filePath);

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(
        `file service error: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

function createDirectories(filePath: string): void {
  const directories = filePath.split(path.sep);
  let directoryPath = '';
  for (const directory of directories) {
    directoryPath = path.join(directoryPath, directory);
    if (!fs.existsSync(path.sep + directoryPath)) {
      fs.mkdirSync(path.sep + directoryPath);
    }
  }
}
