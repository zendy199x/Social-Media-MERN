import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide firstName"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please provide lastName"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password]"],
      min: 5,
      // Passwords will contain at least 1 upper case letter
      // Passwords will contain at least 1 lower case letter
      // Passwords will contain at least 1 number or special character
      // There is no length validation (min, max) in this regex!
      match: [
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Please provide valid password",
      ],
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
