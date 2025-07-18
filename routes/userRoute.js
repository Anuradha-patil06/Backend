const express=require("express");
const { getAllusers, userRegister } = require("../controller/userController");

const routes=express.Router();

routes.get("/",getAllusers)
routes.post("/register",userRegister)
module.exports=routes;