import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
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


export default router;
