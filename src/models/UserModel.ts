import mongoose, { Mongoose } from "mongoose";

interface UserType{
    userId: mongoose.Types.ObjectId;
    email: string;
    username: string;
    password: string;
    
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"]
    },
    username: {
        type: String,
        required: [true, "Username required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    }
},
    {
        timestamps: true
    })

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export { UserModel, UserType };