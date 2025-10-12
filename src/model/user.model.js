import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // lowercase: true,
      min: [6, "Must be of minimum 6 letters"],
      max: [14, "Must be of maximum 12 letters"],
      index: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
//Pre hook save
userSchema.pre("save", async function (next) {
  let modifiedPassword = this.isModified("password");
  let newCheck = this.isNew;
  console.log("modifiedPassword", modifiedPassword);
  console.log("newCheck", newCheck);
  if (!modifiedPassword) return next();
  console.log("password", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//password comparison
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("THIS---->1", this);
  return await bcrypt.compare(password, this.password);
};
//generate access token
userSchema.methods.generateAccessToken = function () {
  console.log("THIS---->1", this);
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
//generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
