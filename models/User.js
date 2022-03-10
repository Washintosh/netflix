const mongoose = require("mongoose");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    profilePic: {
      type: String,
      default:
        "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  this.password = cryptojs.AES.encrypt(
    this.password,
    process.env.SECRET_KEY
  ).toString();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return (
    cryptojs.AES.decrypt(this.password, process.env.SECRET_KEY).toString(
      cryptojs.enc.Utf8
    ) === candidatePassword
  );
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("User", UserSchema);
