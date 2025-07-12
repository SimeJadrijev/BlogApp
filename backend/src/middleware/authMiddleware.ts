import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';

// Extendiranje tipova za `Request` kako bi uključivali `userId`
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Dohvaćanje tokena iz Authorization headera

    if (!token) {
        return res.status(403).json({ message: 'Token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as jwt.JwtPayload;
        req.userId = decoded.userId; // Dodavanje userId u req objekat
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
