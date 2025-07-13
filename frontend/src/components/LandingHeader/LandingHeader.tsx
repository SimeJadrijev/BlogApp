import c from './index.module.css';

type LandingHeaderProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}
export const LandingHeader = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }: LandingHeaderProps) => {
    return <div className={c.landingHeader}>
        <p id={c.ourBlogSign}>Our blog</p>
        <h1>Resources and insights</h1>
        <h3>The latest industry news, interviews, technologies, and resources.</h3>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={c.searchInput}/>
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={c.categorySelect}
        >
            <option value="">All categories</option>
            <option value="sport">Sport</option>
            <option value="politics">Politics</option>
            <option value="work">Work</option>
        </select>

    </div>;
};
