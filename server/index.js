import express from "express";

import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";




const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://sarthaksood09:VKP2eUnfR0HN2lzL@cluster0.sjhk127.mongodb.net/?retryWrites=true&w=majority", {
            dbName: "LMS_DB"
        });
        console.log("connected to database");
    }
    catch (e) {
        console.log(e);
    }
}
connectMongo();

const app = express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:3001"]
}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("hello");
})




app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const users = await userModel.create({
        name: name,
        email: email,
        password: password,
        role: role
    })

    const token=jwt.sign({_id:users._id},"sar",{
        expiresIn:"1d",
    });



    res.status(201).cookie("token",token,{
        httpOnly:true,
        maxAge: 1000*60*60*24*30,
    }).json({ message: 'Signup successful!',users });
})




const emailExist = async (email) => {
    try {
        const user = await userModel.findOne({ email });
        return !!user;
    }
    catch (e) {
        console.log(e, "email found error");
    }
}

app.get("/checkemail", async (req, res) => {
    const {email} = req.query;

    try {
        const userExist = await emailExist(email);

        const exist = userExist;

        console.log(req.user);

        res.json({ exist });
    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error")
    }
})


app.listen(4000, () => {
    console.log("server is running on port 4000");
})


