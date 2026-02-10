require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//auth

exports.auth = async (req, res, next) => {
    try{
        //extract token from cookies
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access, token missing"
            });
        }

        //verify the token
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch(err){
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error verifying token"
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(403).json({
                success: false,
                message: "Access denied. Only students are allowed to access this resource"
            });
        }
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error in student auth middleware"
        });
    }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(403).json({
                success: false,
                message: "Access denied. Only instructors are allowed to access this resource"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error in instructor auth middleware"
        });
    }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "Access denied. Only admins are allowed to access this resource"
            });
        }
        next();
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Error in admin auth middleware"
        });
    }
};