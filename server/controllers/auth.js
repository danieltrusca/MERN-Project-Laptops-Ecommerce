const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  // res.json({
  //   data: "hey you hit create or update user API",
  // });
  const { email, picture } = req.user;
  const user = await User.findOneAndUpdate(
    { email: email, name: email.split("@")[0], picture },
    {},
    { new: true }
  );

  if (user) {
    console.log("User Updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("User created", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;
  User.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
