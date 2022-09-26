const User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.create_user = async (req, res, next) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // create refresh token
    const refreshToken = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    // save user token
    user.token = token;
    user.refreshToken = refreshToken;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.user_login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "10m",
        }
      );
      // create refresh token
      const refreshToken = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "1w" }
      );

      // save user token
      user.token = token;
      user.refresh_token = refreshToken;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

exports.get_users = async (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((user) => {
          return {
            first_name: user?.first_name,
            last_name: user?.last_name,
            id: user._id,
            email: user?.email,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// refresh token

exports.refresh_token = async (req, res, next) => {
  if (req.body.refresh_token) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.body.refresh_token;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      let user = decoded;
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            username: user._id,
            email: user.email,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken });
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
