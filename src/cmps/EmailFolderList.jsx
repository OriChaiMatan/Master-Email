import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function EmailFolderList({ unreadCount }) {

    const folderItems = [
        {
            name: "inbox",
            title: "Inbox",
            to: "/inbox",
        },
        {
            name: "starred",
            title: "Starred",
            to: "/starred",
        },
        {
            name: "trash",
            title: "Trash",
            to: "/trash",
        },
        {
            name: "sent",
            title: "Sent",
            to: "/sent",
        },
        {
            name: "draft",
            title: "Draft",
            to: "/draft",
        },
    ];

    return (
        <section className="email-folder-list">
            <ul className="folder-list">
                {folderItems.map((folder) => (
                    <li key={folder.name}>
                        <Link to={folder.to}>{folder.title}</Link>
                        {folder.name === 'inbox' && <span className="unread-count">{unreadCount > 0 ? ` ${unreadCount}` : ''}</span>}
                    </li>
                ))}
            </ul>
        </section>
    )
}


