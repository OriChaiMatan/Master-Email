import { useState } from "react";
import { Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";


export function EmailPreview({ email, onDelete, onStar, onMarkAsRead }) {
    const [hovered, setHovered] = useState(false);

    return (
        <article className={`email-preview ${email.isRead ? "read" : "unread"} ${email.isStarred ? "starred" : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<button className="star-button" onClick={() => onStar(email)}>{<GoStarFill />}</button>
            <Link to={`/email/${email.id}`} className="email-link">
                <div className="email-content">
                    <div className="send-from">{email.from}</div>
                    <div className="subject">{email.subject} - {email.body}</div>
                </div>
            </Link>
            
			<div className="sent-time">{email.sentAt}</div>
            {hovered && (
                <div className="action-buttons">
                    <button className="delete-button" onClick={() => onDelete(email.id)}><MdDelete /></button>
					<button onClick={onMarkAsRead}>Mark as Read</button>
                </div>
            )}
        </article>
    );
}
