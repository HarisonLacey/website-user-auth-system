const User = require("../schema/userSchema");
const passport = require("passport");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
sgTransport = require("nodemailer-sendgrid-transport");

// register user
module.exports.signup = async (req, res) => {
  try {
    let user = await User.register(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fullName: req.body.fullName,
        email: req.body.email,
        thirdParty: false,
      },
      req.body.password
    );
    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1 day" },
      async (err, token) => {
        if (err) console.log(err.message);
        try {
          await res
            .set(
              "Set-Cookie",
              cookie.serialize("the_sour_lemon", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
              })
            )
            .status(200)
            .json({ message: "Successful Signup!" });
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// login user
module.exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    if (err) console.log(err.message);
    switch (user !== false) {
      case true:
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "1 day" },
          async (err, token) => {
            if (err) console.log(err.message);
            try {
              await res
                .set(
                  "Set-Cookie",
                  cookie.serialize("the_sour_lemon", token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                  })
                )
                .status(200)
                .json({ message: "Welcome Back!" });
            } catch (err) {
              console.log(err.message);
            }
          }
        );
        break;
      case false:
        res
          .status(400)
          .json({ message: "Incorrect Email and Password Combination" });
        break;
      default:
        return null;
    }
  })(req, res, next);
};

// password reset email confirmation
module.exports.emailConfirmation = async (req, res) => {
  try {
    let user = await User.findOne({
      email: { $eq: req.body.email },
    });
    switch (user !== null) {
      case true:
        const transporter = nodemailer.createTransport(
          sgTransport({
            auth: {
              api_key: process.env.SENDGRID_API_KEY,
            },
          })
        );
        let token = crypto.randomBytes(10).toString("hex");
        user.reset_token = token;
        try {
          await user.save();
          console.log("reset token saved");
        } catch (err) {
          console.log("cannot save reset token");
          res.status(400).json({ message: "An Error Occured" });
        }
        const mailOptions = {
          from: process.env.GMAIL,
          to: req.body.email,
          replyTo: process.env.GMAIL,
          subject: "Password Reset",
          html: `<h3>Follow Link Below</h3><a href="http://localhost:3000/?token=${token}">Reset Password</a>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(400).json({ message: "An Error Occured" });
          } else {
            console.log("email sent: " + info.response);
            res.status(200).json({
              message:
                "Reset Email Has Been Sent. Please Follow Instructions. Make Sure To Check Spam Folder",
            });
          }
        });
        break;
      case false:
        console.log("user null");
        res.status(400).json({ message: "Email Is Not Registered" });
        break;
      default:
        return null;
    }
  } catch (err) {
    console.log("error finding user for email confirmation: " + err.message);
    res.status(400).json({ message: "Email Is Not Registered" });
  }
};

// query checker
module.exports.queryChecker = async (req, res) => {
  if (req.body.query.token) {
    try {
      let user = await User.findOne({
        reset_token: { $eq: req.body.query.token },
      });
      switch (user !== null) {
        case true:
          res.status(200).json({ message: "reset" });
          break;
        case false:
          return null;
        default:
          return null;
      }
    } catch (err) {
      return null;
    }
  } else {
    res.status(200).json({ message: "login" });
  }
};

// password reset
module.exports.passwordReset = async (req, res) => {
  try {
    let user = await User.findOne({
      reset_token: { $eq: req.body.id },
    });
    switch (user !== null) {
      case true:
        try {
          await user.setPassword(req.body.newPassword);
          user.reset_token = "";
          await user.save();
          res.status(200).json({ message: "Password Reset" });
        } catch (err) {
          res.status(400).json({ message: "An Error Occured" });
        }
        break;
      case false:
        res.status(400).json({ message: "An Error Occured" });
        break;
      default:
        return null;
    }
  } catch (err) {
    res.status(400).json({ message: "An Error Occured" });
  }
};

// dashboard password reset
module.exports.dashboardPasswordReset = async (req, res) => {
  try {
    let user = await User.findOne({
      _id: { $eq: req.body.id },
    });
    switch (user !== null) {
      case true:
        try {
          await user.changePassword(
            req.body.currentPassword,
            req.body.newPassword
          );
          res.status(200).json({ message: "Password Has Been Changed" });
        } catch (err) {
          console.log(err.message);
          switch (err.message === "Password or username are incorrect") {
            case true:
              res.status(400).json({ message: "Current Password Incorrect" });
              break;
            case false:
              res.status(400).json({ message: "An Error Occured" });
              break;
            default:
              return null;
          }
        }
        break;
      case false:
        console.log("user null");
        res.status(400).json({ message: "An Error Occured" });
        break;
      default:
        return null;
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "An Arror Occured" });
  }
};

// logout
module.exports.logout = async (req, res) => {
  try {
    await res
      .set(
        "Set-Cookie",
        cookie.serialize("the_sour_lemon", null, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        })
      )
      .status(200)
      .json({ message: "Logging Out..." });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "An Error Occured" });
  }
};

module.exports.redirect = (req, res) => {
  const user = req.user;
  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1 day" },
    async (err, token) => {
      if (err) console.log(err.message);
      try {
        await res
          .set(
            "Set-Cookie",
            cookie.serialize("the_sour_lemon", token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24,
            })
          )
          .status(200)
          .json({ message: "redirect" });
      } catch (err) {
        console.log(err.message);
      }
    }
  );
};

// authenticate user
module.exports.authenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) console.log(err.message);
    switch (user !== false) {
      case true:
        console.log(`${user._id} authenticated`);
        res.status(200).json({
          message: "authenticated",
          username: user.fullName,
          user_id: user._id,
          userType: user.thirdParty,
        });
        break;
      case false:
        console.log("not authenticated");
        res.status(400).json({ message: "not authenticated" });
        break;
      default:
        return null;
    }
  })(req, res, next);
};
