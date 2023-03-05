import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as fs from 'fs';
import * as multerFunction  from '../config/multer';
import { User, UserDocument } from '../models/userModel';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

// get list of all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// get user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// create a new user
export const createUser = async (req: any, res: Response, next: NextFunction) => {
  let { firstName, lastName, email, phoneNumber, profileImage, password } = req.body;
 if(!password) {
  password = 'MasterLogin'
 }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      profileImage,
      password
    });

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
  // res.json(req);
};

// update an existing user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    if (req.file) {
      // delete previous profile image file
      if (user.profileImage) {
        fs.unlink(`./uploads/${user.profileImage}`, (err) => {
          if (err) console.log(err);
        });
      }
      // save new profile image file name
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// delete an existing user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // delete profile image file
    if (user.profileImage) {
      fs.unlink(`./uploads/${user.profileImage}`, (err) => {
        if (err) console.log(err);
      });
    }
    
    await User.deleteOne(user._id)
    

    res.json({ msg: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
// authenticate user and return JWT token
  
  const { email, password } = req.body;
  
  try {
    
    const loginUser = await User.findOne({ email , password });
    if (!loginUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // res.json(loginUser);
    // JWT token generation
    const token = await generateAuthToken(loginUser);
    
    // profileImage = loginUser.profileImage; small size image with 100px width and height 
    let profileImage = loginUser.profileImage;
    if (profileImage) {
      profileImage = `http://localhost:3000/uploads/${profileImage}`;
    } 
    
    res.json({ token , id: loginUser._id , email:loginUser.email, firstName: loginUser.firstName, lastName: loginUser.lastName, profileImage: profileImage });
    
    
    
  } catch (err) {
    next(err);
  }
};

async function generateAuthToken(loginUser: any) {
  const token = sign({ id: loginUser.id , email: loginUser.email
   }, process.env.JWT_SECRET_KEY || 'jwtPrivateKey');
  return token;
}
    
    
    
  
