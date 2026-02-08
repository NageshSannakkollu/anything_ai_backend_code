const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const userRegistration = async(req,res) => {
    const {email,password,role} = req.body;
    // const {userDetails} = req.body;
    // console.log("UserDetails:",userDetails)
    User.createUser(email,password,role,(err,newUser) => {
        if(err){
            return res.status(200).json({message:"Email already exists",success:false})
          }
        return res.status(201).json({message:"New User Created Successfully!",user:newUser,success:true})
        });

    };

const loginUser = async(req,res) => {
    const {email,password} = req.body;
    // console.log("LoginEmail:",email,password)
    User.getByEmail(email,async(err,user) => {
        if(err || user===undefined){
            // console.log("Error:",err)
            return res.status(200).json({message:"Invalid Email..",success:false})
        }   
        // console.log("User:",user)
        const isMatch = await bcrypt.compare(password,user.password) 
        // console.log("isMatch:",isMatch)
        if(!isMatch){
            return res.status(200).json({message:"Invalid password!!",success:false})
        }else{
            const payload = {email:email} 
            const token = jwt.sign(payload,`${process.env.JWT_SECRET}`)
            res.status(200).json({jwtToken:token,success:true,message:"Login Success",user})
        }  
    })
}

const profileDetails = (req,res) => {
    const {email} = req;
    // console.log("Email:",email)
    User.getProfileEmail(email,async(err,user) => {
        if(err || user===undefined){
            // console.log("Error:",err)
            return res.status(200).json({message:"Invalid Email..",success:false})
        }else{
            return res.status(200).json({user})
        }
    })
}

const deleteSpecificUser = async(req,res) => {
    const {id} = req.params;
    // console.log("Username:",username)
    User.deleteUser(id,(err,user) => {
        if(err){
            console.log("Error:",err)
            return res.status(200).json({message:"Invalid username",success:false})
        }
        res.status(200).json({message:"User deleted Successfully",user:user,success:true})
    })
}

const retrieveAllUsers = async(req,res) => {
    User.getAllUsers((err,user) => {
        if(err){
            return res.status(200).json({message:"Invalid User Request",success:false})
        }
        res.status(200).json({users:user,success:true})
    })
}

module.exports = {userRegistration,loginUser,profileDetails,deleteSpecificUser,retrieveAllUsers}