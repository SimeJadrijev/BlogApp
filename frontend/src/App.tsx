import c from './app.module.css';
import { BlogCard } from './components/BlogCard';

function App() {

    return (
        <div className={`${c}`}>
            <BlogCard/>
        </div>
    );
}

export default App;
