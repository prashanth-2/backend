import express from 'express';
import multer from 'multer';
import * as UserController from '../controllers/userController';
const path = require('path');

const router = express.Router();
const fs = require('fs')


const storage = multer.diskStorage({
  destination: `./uploads/`,
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });


// User routes
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/authenticate', UserController.authenticateUser);

router.post('/upload', upload.single('file'), (req, res) => {
  res.send(req.file);
});


export default router;
