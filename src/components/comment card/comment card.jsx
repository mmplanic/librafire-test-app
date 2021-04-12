import './comment card.scss';
import { getClassName } from '../../utils/utils'

export default function CommentCard({ title, text, className }) {
    return (
        <div className={getClassName('comment-card' , className)}>
            <h2 className="comment-card__title">{ title }</h2>
            <p className="comment-card__text">{ text }</p>
        </div>
    )
}
