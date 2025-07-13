import c from './index.module.css';

type LandingHeaderProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}
export const LandingHeader = ({ searchTerm, setSearchTerm }: LandingHeaderProps) => {
    return <div className={c.landingHeader}>
        <p id={c.ourBlogSign}>Our blog</p>
        <h1>Resources and insights</h1>
        <h3>The latest industry news, interviews, technologies, and resources.</h3>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={c.searchInput}/>
    </div>;
};
