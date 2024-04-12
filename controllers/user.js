import { User } from "../models/user.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import { errorMiddleware } from "../middlewares/error.js";



export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new errorMiddleware("Invaild Email or Password", 400));



        const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) return res.status(404).json({ //When user available..
        //     success: false,
        //     message: 'User Doesnt Exist',
        // });
        if (!isMatch) return next(new errorMiddleware("User Doesnt Exist", 400));


        sendCookie(user, res, `Welcome back,${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res) => { //New Users Can Register
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });//Find User

        // if (user) return res.status(404).json({ //When user available..
        //     success: false,
        //     message: 'User already registered Exist',
        // })
        if (!user) return next(new errorMiddleware("User already registered Exist", 400));

        const hashPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashPassword });//password kry pair hashpassword

        sendCookie(user, res, "Register Successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => { // Get Users Detalis

    // const id = "myid"; //When my Id Available Authencation


    res.status(200).json({
        success: true,
        user: req.user,
    });

};

export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            samesite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })//Logout cookie delete 
        .json({
            success: true,
            user: req.user,
        });
}



















// export const updateUsers = async (req, res) => { // Updates  Users Detalis
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success: true,
//         message: "Update Successfully",
//     });

// }
// export const deleteUsers = async (req, res) => { // Delete  Users
//     const { id } = req.params;
//     const user = await User.findById(id);
//     // await user.remove();
//     res.json({
//         success: true,
//         message: "Deleted Successfully",
//     });

// }