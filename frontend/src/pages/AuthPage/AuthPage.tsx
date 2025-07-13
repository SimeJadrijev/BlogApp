import c from './index.module.css';
import { useRegister } from '../../hooks/useRegister.ts';
import { useLogin } from '../../hooks/useLogin.ts';
import { useState } from 'react';

export const AuthPage = () => {
    const register = useRegister();
    const login = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        register.mutate({ username, password }, {
            onSuccess: () => {
                setUsername('');
                setPassword('');
                window.location.href = '/blogs';
            },
            onError: () => {
                alert('Error during registration');
            },
        });
    };

    const handleLogin = () => {
        login.mutate({ username, password }, {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                setUsername('');
                setPassword('');
                window.location.href = '/blogs';
            },
            onError: () => {
                alert('Invalid username or password');
            },
        });
    };

    return (
        <div className={c.authPage}>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className={c.authPageButtons}>
                <button className={c.loginButton} onClick={handleLogin}>Login</button>
                <button className={c.registerButton} onClick={handleRegister}>Register</button>
            </div>
        </div>
    );

};
