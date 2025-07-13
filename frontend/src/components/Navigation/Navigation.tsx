import c from './index.module.css';
import { Link } from 'react-router-dom';

export const Navigation = () => {
    return <div className={c.navigation}>
        <nav>
            <p><Link to={'/blogs'}>Blogs</Link></p>
            <p><Link to={'/blogs/new'}>New blog</Link></p>
            <p><Link to={'/my-profile'}>My profile</Link></p>
            <p><Link to={'/auth'}>Login/Register</Link></p>
        </nav>
    </div>;

};
