import c from './index.module.css';
import DefaultBlogImage from '../../assets/images/default-blog.png';
import DefaultUserImage from '../../assets/images/deafult-user.jpg';

export const BlogCard = () => {
    return <div className={c.card}>

        <div className={c.cardUpper}>
            <img className={c.cardImage} src={DefaultBlogImage} alt="blog"/>
            <h3>Design</h3>
            <h1>UX Review presentations</h1>
            <p>How do you create compelling presentations that wow your colleagues and impress your managers?</p>

        </div>
        <div className={c.cardFooter}>
            <img src={DefaultUserImage} alt="user"/>
            <div className={c.cardFooterRight}>
                <h4>John Doe</h4>
                <p>20 Jan 2022</p>
            </div>
        </div>
    </div>;
};
