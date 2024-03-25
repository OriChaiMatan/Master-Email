import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail, onMoveToTrash, currentFolder}) {
    function onStarEmail(email) {
        const newEmail = { ...email, isStarred: !email.isStarred };
        onUpdateEmail(newEmail);
    }

    function onMarkAsRead(email) {
        console.log('inside')
        const newEmail = { ...email, isRead: true };
        onUpdateEmail(newEmail);
    }

    if (!emails) return <div>Loading..</div>;

    return (
        <ul className="email-list">
            {emails.map((email) => (
                <li key={email.id} >
                    <EmailPreview email={email} onDelete={onRemoveEmail} onStar={() => onStarEmail(email)} onMarkAsRead={() => onMarkAsRead(email)} onMoveToTrash={() => onMoveToTrash(email)} currentFolder={currentFolder} />
                </li>
            ))}
        </ul>
    );
}
