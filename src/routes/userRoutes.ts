import express from 'express';
import multer from 'multer';
import * as UserController from '../controllers/userController';
const path = require('path');

const router = express.Router();
const fs = require('fs')


// 1 / 2 requests
// 1.7 kB / 1.7 kB transferred
// 1.4 kB / 62.1 kB resources
// ------WebKitFormBoundarymaBZmXbZmovrUm2V
// Content-Disposition: form-data; name="profileImage"; filename="Screenshot from 2023-03-03 20-21-33.png"
// Content-Type: image/png


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
