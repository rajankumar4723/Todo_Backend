import express from 'express';
// import { User } from '../models/user.js';
import {   getMyProfile, login, logout, register } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();


router.post("/new", register);   //Funcation Call for Post Users Register 

router.post("/login", login);  

router.get("/logout", logout);  


router.get("/me",isAuthenticated,getMyProfile);




//19 to 21 is code  in One line
//  .put(updateUsers)
// .delete(deleteUsers)


// router.get("/userid/:id", getUsersDetails); //Funcation Call for Get Specific Users deatails 
// router.put("/userid/:id", updateUsers); //Update User Get Specific Users deatails 
// router.delete("/userid/:id", deleteUsers); //Funcation Call for  Specific Users Delete 

export default router;