import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        default: "student"
    },
    photoUrl:{
type: String,
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, {timestamps: true});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, process.env.SECRET_CODE, {expiresIn: '1d'});
    return token;
}

userSchema.methods.validatePassword = async function(password){
    const hashedPassword = this.password;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
}

export const User = mongoose.model("User", userSchema);