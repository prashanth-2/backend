import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^\d{10}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  profileImage: {
    type: String,
    default: '',
  },
  password: { 
    type: String,
    required: true,
  },
  
});

export const User = mongoose.model<UserDocument>('User', userSchema);
