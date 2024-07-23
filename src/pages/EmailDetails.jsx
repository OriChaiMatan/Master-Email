import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import { emailService } from "../services/email.service";
import { GoogleMap } from "../cmps/GoogleMap"; 


export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmails()
    }, [params.emailId])

    async function loadEmails() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
            onMarkAsRead(email)
        } catch (err) {
            console.log('Error in loademail', err)
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
        }
    }

    function onMarkAsRead(email) {
        const newEmail = { ...email, isRead: true };
        onUpdateEmail(newEmail);
    }

    if (!email) return <div>Loading..</div>
    return (
        <section className="email-details">
            <Link to="/inbox"> <FaArrowLeft /> </Link>
            <h2>Subject: {email.subject}</h2>
            <h4> {email.from}</h4>
            <pre>{email.body}</pre>
            {email.senderLocation && <GoogleMap location={email.senderLocation} />}
        </section>
    )
}