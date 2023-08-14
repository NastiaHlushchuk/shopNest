import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './src/uploads',
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(15)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    };
  }
}
