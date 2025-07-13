import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();

// Ruta za registraciju korisnika
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Provjera da li korisnik već postoji
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Korisnik s tim korisničkim imenom već postoji.' });
        }

        // Hashiranje lozinke
        const salt = await bcrypt.genSalt(10); // Salt za bcrypt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Kreiranje novog korisnika
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Spremanje korisnika u bazu
        await newUser.save();

        res.status(201).json({ message: 'Korisnik uspješno registriran!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Došlo je do greške prilikom registracije.' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Provjera postoji li korisnik
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Korisničko ime ne postoji.' });
        }

        // Provjera lozinke
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Lozinka nije ispravna.' });
        }

        // Generiranje JWT tokena
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || 'your_jwt_secret',  // Ovo bi trebalo biti pohranjeno u env varijabli
            { expiresIn: '1d' }  // Token će isteći nakon 1 sata
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Došlo je do greške prilikom prijave.' });
    }
});


export default router;
