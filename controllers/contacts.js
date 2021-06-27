const {
    listContacts,
    createContact,
    getContactById,
    removeContact,
    updateContact,
  } = require("../repositories/contacts");
  const {
    HttpCode,
    Status,
    Message,
    createResponse,
  } = require("../helpers/constants");
  //kdfjhdkfj
  const getAll = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { docs: contacts, ...rest } = await listContacts(userId, req.query);
      res.json(
        createResponse(Status.SUCCESS, HttpCode.SUCCESS, {
          data: { contacts, ...rest },
        })
      );
    } catch (e) {
      next(e);
    }
  };
  
  const create = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const contact = await createContact(userId, req.body);
      return res
        .status(HttpCode.CREATER)
        .json(
          createResponse(Status.SUCCESS, HttpCode.CREATER, { data: { contact } })
        );
    } catch (e) {
      next(e);
    }
  };
  
  const getById = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const contact = await getContactById(userId, req.params.id);
      return contact
        ? res.json(
            createResponse(Status.SUCCESS, HttpCode.OK, { data: { contact } })
          )
        : res.json(
            createResponse(Status.ERROR, HttpCode.NOT_FOUND, {
              message: Message.NOT_FOUND,
            })
          );
    } catch (e) {
      next(e);
    }
  };
  
  const remove = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const contact = await removeContact(userId, req.params.id);
      return contact
        ? res.json(
            createResponse(Status.SUCCESS_DELETE, HttpCode.OK, {
              data: { contact },
            })
          )
        : res.json(
            createResponse(Status.ERROR, HttpCode.NOT_FOUND, {
              message: Message.NOT_FOUND,
            })
          );
    } catch (e) {
      next(e);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const userId = req.user.id;
      if (Object.keys(req.body).length !== 0) {
        const contact = await updateContact(userId, req.params.id, req.body);
        return contact
          ? res.json(
              createResponse(Status.SUCCESS, HttpCode.OK, { data: { contact } })
            )
          : res.json(
              createResponse(Status.ERROR, HttpCode.ERROR, {
                message: Message.NOT_FOUND,
              })
            );
      }
      return res.json(
        createResponse(Status.BAD_REQYEST, HttpCode.BAD_REQYEST, {
          message: Message.BAD_REQYEST,
        })
      );
    } catch (e) {
      next(e);
    }
  };
  
  module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
  };