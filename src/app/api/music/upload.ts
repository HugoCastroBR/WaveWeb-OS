// api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

const storage = multer.diskStorage(
  {
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload.single('file'); // 'file' é o nome do campo de arquivo no formulário
