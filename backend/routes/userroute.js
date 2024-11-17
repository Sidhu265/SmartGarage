const express = require("express");
const dotenv = require('dotenv')
dotenv.config();
// const app = express();
const { userRegistrationSchema,userLoginSchema } = require( '../schemas/userschema');
const  UserModel = require( '../models/user');

const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET

userRouter.post("/signup", async function(req, res) {

    const result = userRegistrationSchema.safeParse(req.body);

    if (!result.success) {  
        return res.status(400).json({
            errors: result.error.errors
        });
    }

   const { email, password, name } = result.data;
  
   try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });
    res.json({
        message: "You are signed up"
    });
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
});


userRouter.post("/signin", async function(req, res) {
    const result = userLoginSchema.safeParse(req.body);

    if (!result.success) {  
        return res.status(400).json({
            errors: result.error.errors,
        });
    }
    const { email, password } = result.data;
    const user = await UserModel.findOne({
        email: email
    });
    if (user && bcrypt.compare(password,user.password)) { 
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({
            message: "User Signed in successfully!",
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials!"
        });
    }
});

module.exports = userRouter;