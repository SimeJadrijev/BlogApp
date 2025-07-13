import c from './app.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BlogPage } from './pages/BlogPage';
import { AuthPage } from './pages/AuthPage';
import { Navigation } from './components/Navigation';
import { CreateBlogPage } from './pages/CreateBlogPage';

function App() {

    return (
        <div className={`${c}`}>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/blogs"/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/blogs" element={<LandingPage/>}/>
                <Route path="/blogs/:blogId" element={<BlogPage/>}/>
                <Route path="/blogs/new" element={<CreateBlogPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
