import bcrypt from "bcrypt"; // crypt the password
import jwt from "jsonwebtoken"; // send user web token for authontication
import User from "../models/User.js";

/* Regester user */
export const regester = async (req, res) => {
  try {
    // get the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      firends,
      location,
      occupation,
    } = req.body;

    // create a salt to encrypt the password
    const salt = await bcrypt.genSalt();
    // encrypt the password and save it
    const passwordHash = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      firends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // save the user and send it
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    // sen the error message from the database
    res.status(500).json({ error: err.message });
  }
};

/* Loging In */
export const login = async (req, res) => {
  try {
    // get the reques body
    const { email, password } = req.body;

    // search for the user in database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist!" });

    // compare the passowrds as hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password!" });

    // set the user login token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // delete the password and return the user
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    // sen the error message from the database
    res.status(500).json({ error: err.message });
  }
};

// 49:29
