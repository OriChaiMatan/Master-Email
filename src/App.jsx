import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';

import { AppHeader } from './cmps/AppHeader';
import { EmailDetails } from './pages/EmailDetails';
import { EmailCompose } from './pages/EmailCompose';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <Routes>
                    <Route path="/" element={<EmailIndex />} >
                        <Route path="/email/newemail" element={<EmailCompose />} />
                    </Route>
                    <Route path="/email/:emailId" element={<EmailDetails />} />
                </Routes>
            </section>
        </Router>
    )
}

