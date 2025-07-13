// backend/seeders/userSeeder.ts
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
    try {
        const users = [
            { username: 'sime.jadrijev', password: 'password123' },
            { username: 'goran.zaharija', password: 'password123' },
            { username: 'toni.jadrijev', password: 'password123' },
        ];


        const hashedUsers = await Promise.all(
            users.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return { ...user, password: hashedPassword };
            })
        );

        await User.insertMany(hashedUsers);
        console.log('Users seeded!');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};
