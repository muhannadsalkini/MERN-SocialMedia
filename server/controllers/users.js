import { Promise } from "mongoose";
import User from "../models/User";

// Get the user information
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    // send the error message from the database
    res.status(404).json({ error: err.message });
  }
};

// get the users firends
export const getUserFirends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const firends = Promise.all(user.firends.map((id) => User.findById(id)));

    // format the users firends list
    const formatedFriedns = firends.map(
      ({ _id, firstName, lastName, occupation, locaton, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          locaton,
          picturePath,
        };
      }
    );
    res.status(200).json(formatedFriedns);
  } catch (err) {
    // send the error message from the database
    res.status(404).json({ error: err.message });
  }
};

// Add remove firend
export const addRemoveFirend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const firend = await User.findById(friendId);

    if (user.firends.includes(friendId)) {
      // remove the firendship if its exist
      user.firends = user.firends.filter((id) => id !== firendId);
      firend.firends = firend.firends.filter((id) => id !== id);
    } else {
      user.firends.push(firendId);
      firend.firends.push(id);
    }
    // save the updates
    await user.save();
    await firend.save();

    // format the users firends list
    const formatedFriedns = firends.map(
      ({ _id, firstName, lastName, occupation, locaton, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          locaton,
          picturePath,
        };
      }
    );
    res.status(200).json(formatedFriedns);
  } catch (err) {
    // send the error message from the database
    res.status(404).json({ error: err.message });
  }
};
