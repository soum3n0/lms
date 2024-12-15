import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new Error("Unauthorized");
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        if(!decoded){
            throw new Error("Invalid token");
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
