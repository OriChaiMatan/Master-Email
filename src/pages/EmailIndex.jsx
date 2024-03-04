import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom";
import { emailService } from './../services/email.service';

import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { SideBar } from "../cmps/SideBar"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Error in loadEmails', err)
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails((prevEmails) => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (err) {
            console.log('Error in onRemoveEmail', err)
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(currEmail => currEmail.id === updatedEmail.id ? updatedEmail : currEmail))
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
        }
    }


    return <section className="email-index">
        <div className="side-bar-container">
            <SideBar />
        </div>
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <div className="email-list-container">
            <EmailList
                emails={emails}
                onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail}
            />
        </div>
    </section>
}