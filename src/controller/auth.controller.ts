import { UserModel } from "@/models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAuthToken } from "@/lib/AuthToken";

enum UserRole {
    Normal = "Normal",
    Admin = "Admin"
}

class AuthController {


    register = async (req: Request, res: Response) => {

        try {
            const { username, email, password } = req.body;

            const exists = await UserModel.findOne({ email });
            if (exists) return res.status(403).json({ message: "User already exists", success: false });

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UserModel.create({ username, email, password: hashedPassword });
            await result.save();

            return res.status(201).json({
                message: "User registered successfully",
                success: true,
                user: result
            })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }


    login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) return res.status(404).json({ error: "User doesn't exist", success: false });

            const validatePassword = await bcrypt.compare(password, user.password);

            if (!validatePassword) return res.status(401).json({ error: "Invalid password", success: false });

            const token = await generateAuthToken({ userId: user._id, userRole: UserRole.Normal });

            return res.status(200).json({ message: "Login Successful", token, success: true });

        } catch (error: any) {
            console.error(error)
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new AuthController();