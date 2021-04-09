
export default function PostCard({ title, text, link }) {
    const { text: linkText, attributes } = link;
    return (
        <div className='post-card'>
            <h2 className='post-card__title'>{ title }</h2>
            <p className='post-card__text'>{text}</p>
            <a className='post-card__link' {...attributes} >{ linkText }</a>
        </div>
    )
}
