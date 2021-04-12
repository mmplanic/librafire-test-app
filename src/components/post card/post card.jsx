import './post card.scss';
import { NavLink } from "react-router-dom";
import { getClassName } from "../../utils/utils";

export default function PostCard({ title, text, link, className }) {
    const { text: linkText, attributes } = link;
    return (
        <div className={getClassName('post-card' , className)}>
            <h2 className='post-card__title'>{ title }</h2>
            <p className='post-card__text'>{text}</p>
            <NavLink className='post-card__link' {...attributes} >{ linkText }</NavLink>
        </div>
    )
}
