import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";


import { emailService } from "../services/email.service"; 

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
        } catch (err) {
            navigate('/email')
            console.log('Error in loademail', err)
        }
    }

    if (!email) return <div>Loading..</div>
    return (
        <section className="email-details">
            <Link to="/"> <FaArrowLeft /> </Link>
            <h2>Subject: {email.subject}</h2>
            <h4> {email.from}</h4>
            <h4>{email.body}</h4>
        </section>
    )
}