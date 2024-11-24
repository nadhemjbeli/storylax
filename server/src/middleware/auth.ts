// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {IUserSchema} from "../models/user/users.schema";
import {User} from "../models/user/users.model";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticateTraveler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['storylax-token'];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded:any = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin'||decoded.role !== 'traveler') {
            return res.status(403).json({ message: 'Access Forbidden: Requires Traveler Role' });
        }
        (req as any).user = await User.findById(decoded.id);

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['storylax-token'];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded:any = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access Forbidden: Requires Admin Role' });
        }
        (req as any).user = await User.findById(decoded.id);

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
export const authenticateUserByRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['storylax-token'];
        if (!token) {
            console.log('Token not found');
            return res.status(401).json({ message: 'Access Denied' });
        }

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);

            const user = await User.findById(decoded.id);
            if (!user) {
                console.log('User not found');
                return res.status(401).json({ message: 'User not found' });
            }
            if (user.role && !roles.includes(user.role)) {
                console.log('Forbidden: Insufficient role', user.role);
                return res.status(403).json({ message: 'Forbidden: Insufficient role' });
            }

            (req as Request).user = user;
            next();
        } catch (error) {
            console.log('Invalid Token:', error);
            res.status(400).json({ message: 'Invalid Token' });
        }
    };
};


