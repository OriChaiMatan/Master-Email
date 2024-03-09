import gmailIcon from '../assets/imgs/gmail-icon.png'

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <div className="app-logo">
                    <img src={gmailIcon} alt="Gmail Icon" />
                </div>
            </section>
        </header>
    )
}