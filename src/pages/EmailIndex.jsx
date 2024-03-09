import { useEffect, useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"

import { emailService } from './../services/email.service'

import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { AppHeader } from "../cmps/AppHeader"
import { SideBar } from "./SideBar"
import { EmailSearchFilter } from "../cmps/EmailSearchFilter"

import { HiOutlinePencil } from "react-icons/hi2"

export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
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

    async function onAddEmail(email) {
        try {
            const savedEmail = await emailService.save(email)
            setEmails(prevEmails => [...prevEmails, savedEmail])
        } catch (err) {
            console.log('Had issues adding email', err);
        }
    }

    return <section className="email-index">
        <div className="header-left-container">
            <AppHeader />
        </div>
        <div className="header-right-container">
            <EmailSearchFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </div>
        <div className="side-bar-container">
            <nav>
                <Link to="/email/newemail"><button className="new-mail-btn"><HiOutlinePencil />  Compose</button></Link>
            </nav>
        </div>
        <div className="email-list-container">
            <div className="list-filter-container">
                <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            </div>
            <EmailList
                emails={emails}
                onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail}
            />
            <Outlet context={{ title: 'hi', onAddEmail, onUpdateEmail }} />
        </div>
    </section>
}