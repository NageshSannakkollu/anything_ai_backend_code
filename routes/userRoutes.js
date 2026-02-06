const express = require("express")
const {userRegistration,loginUser,profileDetails, deleteSpecificUser, retrieveAllUsers} = require("../controller/userController")
const authenticateToken = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/api/v1/auth/signup",userRegistration)
router.post("/api/v1/auth/login",loginUser)
router.get("/api/v1/auth/profile",authenticateToken,profileDetails)
router.delete("/api/v1/auth/delete",authenticateToken,deleteSpecificUser)
router.get("/api/v1/auth/all-users",retrieveAllUsers)

module.exports = router;