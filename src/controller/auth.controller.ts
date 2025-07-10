import { UserModel } from "@/models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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
            return res.status(400).json({error: error.message})
        }
    }


    login = async () => {

    }
}

export default new AuthController();