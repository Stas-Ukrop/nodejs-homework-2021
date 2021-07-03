const Contact = require("../model/schemaContact");

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 3,
    offset = 0,
  } = query;
  const option = { owner: userId };
  if (favorite !== null) {
    option.favorite = favorite;
  }
  const result = await Contact.paginate(option, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: "name lastName email subscription",
    },
  });
  return result;
};

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: userId,
  });
  return result;
};

const createContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
};
