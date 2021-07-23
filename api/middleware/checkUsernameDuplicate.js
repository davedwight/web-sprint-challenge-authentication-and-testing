const User = require("../users/model");

const checkUsernameDuplicate = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findBy({ username });
  if (user.length > 0) {
    next({
      status: 401,
      message: "username taken",
    });
  } else {
    next();
  }
};

module.exports = {
  checkUsernameDuplicate,
};
