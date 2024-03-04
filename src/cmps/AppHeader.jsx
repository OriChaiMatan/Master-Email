import { NavLink } from "react-router-dom";
import gmailIcon from '../assets/imgs/gmail-icon.png';

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <div className="app-logo">
                    <h1>Gmail</h1>
                    <img src={gmailIcon} alt="Gmail Icon" />
                </div>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/email">Emails</NavLink>
                </nav>
            </section>
        </header>
    )
}