import mongoose, { Schema, Document } from 'mongoose';

// Definiranje tipova za korisnika
interface IUser extends Document {
    username: string;
    password: string;
}

// Definiranje sheme za korisnika
const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Dodaje createdAt i updatedAt
    }
);

// Kreiranje modela korisnika
const User = mongoose.model<IUser>('User', userSchema);

export default User;
