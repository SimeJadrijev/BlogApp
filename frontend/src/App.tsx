import c from './app.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BlogPage } from './pages/BlogPage';
import { AuthPage } from './pages/AuthPage';

function App() {

    return (
        <div className={`${c}`}>
            <Routes>
                <Route path="/" element={<Navigate to="/blogs"/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/blogs" element={<LandingPage/>}/>
                <Route path="/blogs/:blogId" element={<BlogPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
