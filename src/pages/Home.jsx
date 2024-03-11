import imgUrl from '../assets/imgs/react.png'

import { Link } from 'react-router-dom'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to our React App</h1>
            <nav>
                <Link to="/inbox"><button>  start</button></Link>
            </nav>
        </section>
    )
}
