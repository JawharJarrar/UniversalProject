import * as mongoose from 'mongoose';
export const  UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  company: {
    bs: String,
    catchPhrase: String,
    name: String,
  },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
});
