const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//@desc Register User
//@route POST /api/users/login
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const avaliableUser = await User.findOne({ email });
    if (avaliableUser) {
        res.status(400);
        throw new Error("User already registered");
    }
    //hash password
    const hasedpassword = await bcrypt.hash(password, 10);
    console.log(hasedpassword);
    const user = await User.create({
        username, email, password: hasedpassword
    });
    console.log(user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.status(201).json({ message: "registerUser" })
});
//@desc Login User
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const user = await User.findOne({ email: email }).select("password");

    console.log(user.id);
    //compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    res.status(200).json({ accessToken });
    // throw new Error("User not found");

    res.status(200).json({ message: "login" })
});
//@desc Current User
//@route POST /api/users/currentUser
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
    // console.log("test");
    // res.status(200).json({ message: "currentUser" })
});

module.exports = { registerUser, login, currentUser };
