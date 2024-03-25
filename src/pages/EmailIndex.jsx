import { useEffect, useState } from "react"
import { Link, Navigate, Outlet, useParams, useSearchParams } from "react-router-dom"

import { emailService } from './../services/email.service'
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { AppHeader } from "../cmps/AppHeader"
import { EmailSearchFilter } from "../cmps/EmailSearchFilter"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { MobileMenu } from "../cmps/MobileMenu"

import { HiOutlinePencil } from "react-icons/hi2"
import { IoMenu } from "react-icons/io5";

export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(0)
    const [isShow, setIsShow] = useState(false)
    

    useEffect(() => {
        setSearchParams(filterBy)
        loadEmails()
        //console.log('filterBy',filterBy);
    }, [filterBy, params.folder])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy, params.folder)
            setEmails(emails)
            if (params.folder === 'inbox') {
                const unread = emails.filter(email => !email.isRead).length;
                setUnreadCount(unread)
            }
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
            showSuccessMsg('Email removed successfully')
        } catch (err) {
            console.log('Error in onRemoveEmail', err)
            showErrorMsg('Could not remove email')
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            loadEmails()
            //setEmails(prevEmails => prevEmails.map(currEmail => currEmail.id === updatedEmail.id ? updatedEmail : currEmail))
            showSuccessMsg('Email update successfully')
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
            showErrorMsg('Could not update email')
        }
    }

    async function onAddEmail(email) {
        try {
            const savedEmail = await emailService.save(email)
            loadEmails()
            //setEmails(prevEmails => [...prevEmails, savedEmail])
            showSuccessMsg('Email add successfully')
        } catch (err) {
            console.log('Had issues adding email', err);
            showErrorMsg('Could not remove email')
        }
    }

    async function onMoveToTrash(email) {
        if (email.id) {
            await onUpdateEmail({ ...email, removedAt: emailService.getCurrentTime() });
            loadEmails()
            showSuccessMsg('Email moved to trash successfully');
        }
    }

    const { subject, isRead } = filterBy
    return <section className="email-index">
        {isShow && <MobileMenu />}
        <div className="header-left-container">
            <AppHeader />
        </div>
        <div className="header-right-container">
            <button className="menu-btn" onClick={() => setIsShow(!isShow)}><IoMenu /></button>
            <EmailSearchFilter filterBy={subject} onSetFilter={onSetFilter} />
        </div>
        <div className="side-bar-container">
            <nav>
                <Link to="compose"><button className="new-mail-btn" ><HiOutlinePencil />  Compose</button></Link>
            </nav>
            <EmailFolderList unreadCount={unreadCount} />
        </div>
        <div className="email-list-container">
            <div className="list-filter-container">
                {params.folder === 'inbox' && <EmailFilter filterBy={isRead} onSetFilter={onSetFilter} />}
            </div>
            <EmailList
                emails={emails}
                onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail}
                onMoveToTrash={onMoveToTrash}
                currentFolder={params.folder}
            />
            <Outlet context={{ title: 'hi', onAddEmail, onUpdateEmail }} />
        </div>
    </section>
}