const passport = require("passport");
const bcrypt = require("bcryptjs");
const ErroHandler = require("../utils/errorhandler");

const UserModel = require("../models/userModel");


//logout user
exports.logoutUser = async (req, res, next) => {
  req.logout(function (err) {
      if (err) { next(new ErroHandler("Error Occured" + err.message, 400)) }
  });
  if (req.user) {

      res.status(200).json({
          success: false,
          user: req.user,
          message: "Failure occured during Logging Out"
      })
  }
  else {
      res.status(200).json({
          success: true,
          message: "Logged Out successfully",
          user:null
      })
  }
}

//Google Login Starts here
exports.userGoogleLogin = passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/api/v1/login/failed",
});
//Google Profile list
exports.googleProfile = passport.authenticate("google", {
  scope: ["profile", "email"],
});
//Google Login ends here

//register user
exports.registerUser = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    next(new ErroHandler("Please fill all the fields below", 400));
  }
  if (password !== confirmPassword) {
    next(
      new ErroHandler("Please enter the confirm Password same as password", 400)
    );
  }
  if (password) {
    if (password.length < 8) {
      next(
        new ErroHandler(
          "The length of the password should be greater than 8",
          400
        )
      );
    }
  }
  //validation passed
  let user = await UserModel.findOne({ email: email });

  if (user) {
    next(
      new ErroHandler("User already registered  try to LogIn with the form")
    );
  } else {
    const newLocalUser = await new UserModel({
      name,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newLocalUser.password, salt, async (err, hash) => {
        if (err) {
          next(new ErroHandler(err.message, 400));
        }
        //Set the password to the hash
        else {
          newLocalUser.password = hash;
          //Save the user
          await newLocalUser.save();
          passport.authenticate("local", async (err, user, info) => {
            if (err) {
              next(new ErroHandler("Error Occured" + err.message, 400));
            } else if (!user) {
              next(
                new ErroHandler("Please provide the correct credentials", 400)
              );
            } else {
              req.logIn(user, (err) => {
                if (err) {
                  next(new ErroHandler("Error Occured" + err.message, 400));
                } else {
                  res.status(200).json({
                    success: true,
                    user: req.user,
                  });
                }
              });
            }
          })(req, res, next);

          res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user: newLocalUser,
          });
        }
      })
    );
  }
};
//Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // Validate request
  if (!email || !password) {
    next(new ErroHandler("Please fill all the fields", 400));
  }
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      next(new ErroHandler("Error Occured" + err.message, 400));
    } else if (!user) {
      next(new ErroHandler("Please provide the correct credentials", 400));
    } else {
      req.logIn(user, (err) => {
        if (err) {
          next(new ErroHandler("Error Occured" + err.message, 400));
        } else {
          res.status(200).json({
            success: true,
            user: req.user,
          });
        }
      });
    }
  })(req, res, next);
};


exports.loginSuccess = async (req, res, next) => {
    if (req.user) {
      
      
     
       
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,

        });
    }
    else {
        res.status(200).json({
            message: "You are not Logged In",
            user:null
        })
    }
}
exports.loginFailure = async (req, res, next) => {
    res.status(401).json({
        success: false,
        message: "This Email already registered try to login with the form"
    })
}

exports.updateUserRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  req.user.role=req.body.role;
  const user = await UserModel.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User updated Successfully By admin",
  });
};