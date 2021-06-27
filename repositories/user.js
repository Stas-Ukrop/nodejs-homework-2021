const User = require("../model/schemaUser");

const findByID = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (body) => {
  const user = await new User(body);
  return await user.save();
};

const findByToken = async (token) => {
  const { _id, name, email, subscription } = await User.findOne({ token });
  return { _id, name, email, subscription };
};

const updateToket = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const changeSubscription = async (id, newSub) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { ...newSub },
    { new: true }
  );
  return result;
};

module.exports = {
  findByID,
  findByEmail,
  create,
  findByToken,
  updateToket,
  changeSubscription,
};