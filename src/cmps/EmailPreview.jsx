import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export function EmailPreview({ email, onDelete, onStar, onMarkAsRead, onMoveToTrash, currentFolder }) {
    const [hovered, setHovered] = useState(false);

    return (
        <article className={`email-preview ${currentFolder === 'inbox' && email.isRead ? "read" : "unread"} ${email.isStarred ? "starred" : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
            <button className="star-button" onClick={() => onStar(email)}>{<GoStarFill />}</button>
            <Link to={`/folder/email/${email.id}`} className="email-link">
                <div className="email-content">
                    <div className="send-from">{email.from}</div>
                    <div className="subject">{email.subject} - {email.body}</div>
                </div>
            </Link>

            <div className="sent-time">{email.sentAt}</div>
            {hovered && (
                <div className="action-buttons">
                    {email.removedAt === null ? (
                        <button className="delete-button" onClick={() => onMoveToTrash(email)}><MdDelete /></button>
                    ) : (
                        <button className="delete-button" onClick={() => onDelete(email.id)}><MdDelete /></button>
                    )}
                    {email.sentAt === null && (
                        <Link className="delete-button action-button" to={`compose/${email.id}`}><FaEdit /></Link>
                    )}
                    <button className="delete-button" onClick={onMarkAsRead}><MdOutlineMarkEmailRead /></button>
                </div>
            )}
        </article>
    );
}
