import { Link } from 'react-router-dom'

import { EmailFolderList } from './EmailFolderList'

import gmailIcon from '../assets/imgs/gmail-icon.png'
import { HiOutlinePencil } from "react-icons/hi2"

export function MobileMenu() {

    return (
        <section className="mobile-menu-container">
            <div className="app-logo">
                <img src={gmailIcon} alt="Gmail Icon" />
            </div>
            <nav>
                <Link to="compose"><button className="new-mail-btn" ><HiOutlinePencil />  Compose</button></Link>
            </nav>
            <EmailFolderList />
        </section>
    )
}