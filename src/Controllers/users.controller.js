const fs = require("fs");
const userData = require("../../data/users.json");
const User = require("../Models/users.model");
const sendResponse = require("../Helpers/sendResponse");
const AppError = require("../Helpers/AppError");
const sendErrorResponse = require("../Helpers/sendErrorResponse");

const updateDatabse = (path, content) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, content, (err) => {
      rej(err);
    });
    console.log("File written", path);
    res(content);
  });
};

const validateUser = (req, res, next) => {
  const { body } = req;
  const keys = ["id", "name", "introduction", "profileImage", "profileLink"];
  const result = keys.every((ele) => Object.keys(body).includes(ele));

  if (!result) {
    //shortcircuit
    return sendErrorResponse(
      new AppError({ message: "Invalid requested body", statusCode: 422 }),
      req,
      res
    );
  }

  //else
  next();
};

const getAllUsers = (req, res) => {
  return sendResponse(req, res, {
    statusCode: 200,
    message: "Successfully fetched all users",
    payload: userData,
  });
};

const createUser = (req, res) => {
  const { body } = req;
  const user = new User(body);
  userData.push(user);

  //updating databse

  updateDatabse("./data/users.json", JSON.stringify(userData))
    .then((data) => {
      return sendResponse(req, res, {
        statusCode: 200,
        message: "DB updated successfully",
        payload: JSON.parse(data),
      });
    })
    .catch((err) => {
      return sendErrorResponse(
        new AppError({ message: err.message, statusCode: 500 }),
        req,
        res
      );
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = userData.find((ele) => ele.id == id);

  if (user) {
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Found user with id " + id,
      payload: { ...user },
    });
  }

  //else
  return sendErrorResponse(
    new AppError({ message: "User not found", statusCode: 404 }),
    req,
    res
  );
};

const deleteUser = (req, res) => {
  let index = -1;
  const { id } = req.params;
  let user = {};

  userData.forEach((ele, i) => {
    if (ele.id == id) {
      index = i;
      user = ele;
    }
  });

  if (index !== -1) {
    userData.splice(index, 1);
    console.log(userData);

    //updating databse

    updateDatabse("./data/users.json", JSON.stringify(userData))
      .then((data) => {
        return sendResponse(req, res, {
          statusCode: 200,
          message: "User Deleted, DB updated successfully",
          payload: JSON.parse(data),
        });
      })
      .catch((err) => {
        return sendErrorResponse(
          new AppError({ message: err.message, statusCode: 500 }),
          req,
          res
        );
      });
    return;
  }
  return sendErrorResponse(
    new AppError({ message: "Cannot delete, User not found", statusCode: 500 }),
    req,
    res
  );
};

module.exports = {
  getAllUsers,
  getUserById,
  validateUser,
  createUser,
  deleteUser,
};
