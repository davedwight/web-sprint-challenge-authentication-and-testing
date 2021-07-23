const User = require("../users/model");

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findBy({ username });
  if (user.length > 0) {
    req.user = user[0];
    next();
  } else {
    next({
      status: 401,
      message: "invalid credentials",
    });
  }
};

module.exports = {
  checkUsernameExists,
};
