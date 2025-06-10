import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const multerConfigUsers = {
  storage: diskStorage({
    destination: './uploads/users',
    filename: (req, file, callback) => {
      const fileExtName = extname(file.originalname);
      const uniqueName = `${uuidv4()}${fileExtName}`;
      callback(null, uniqueName);
    },
  }),
};