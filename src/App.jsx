import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { EmailIndex } from './pages/EmailIndex';

import { Home } from './pages/Home';
import { EmailDetails } from './pages/EmailDetails';
import { EmailCompose } from './pages/EmailCompose';
import { UserMsg } from './cmps/UserMessage';

export function App() {
    return (
        <Router>
            <section className='main-app'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/:folder" element={<EmailIndex />} >
                        <Route path="/:folder/email/newemail/:emailId?" element={<EmailCompose />} />
                        <Route path="/:folder/email/:emailId" element={<EmailDetails />} />
                    </Route>
                </Routes>
            </section>
            <UserMsg />
        </Router>
    )
}

