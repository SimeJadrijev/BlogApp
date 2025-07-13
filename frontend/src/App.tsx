import c from './app.module.css';
import { LandingPage } from './pages/LandingPage/LandingPage.tsx';

function App() {

    return (
        <div className={`${c}`}>
            <LandingPage/>
        </div>
    );
}

export default App;
