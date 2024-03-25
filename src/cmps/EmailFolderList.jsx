import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom";

import inbox from '../assets/imgs/inbox.png'
import star from '../assets/imgs/starred.png'
import sent from '../assets/imgs/sent.png'
import draft from '../assets/imgs/drafts.png'
import trash from '../assets/imgs/delete.png'


export function EmailFolderList({ unreadCount }) {

    const folderItems = [
        {
            name: "inbox",
            title: "Inbox",
            to: "/inbox",
            imgSrc: inbox,
        },
        {
            name: "starred",
            title: "Starred",
            to: "/starred",
            imgSrc: star,
        },
        {
            name: "trash",
            title: "Trash",
            to: "/trash",
            imgSrc: trash,
        },
        {
            name: "sent",
            title: "Sent",
            to: "/sent",
            imgSrc: sent,
        },
        {
            name: "draft",
            title: "Draft",
            to: "/draft",
            imgSrc: draft,
        },
    ];

    return (
        <section className="email-folder-list">
            <ul className="folder-list">
                {folderItems.map((folder) => (
                    <li key={folder.name} className={location.pathname === folder.to ? "active" : ""}>
                        <NavLink className="item-content" to={folder.to}>
                            <div className="item-folder">
                                <span className="icon-item">
                                    <img src={folder.imgSrc} alt={folder.title} />
                                </span>
                                <span className="name-item">{folder.title}</span>
                            </div>
                            {folder.name === 'inbox' && <span className="count-folder">{unreadCount > 0 ? ` ${unreadCount}` : ''}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </section>
    )
}


