import React, { useState } from "react"; 
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";

export function EmailCompose() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [mail, setMail] = useState(''); 
  
  async function handleSubmit(event) {
    event.preventDefault();
    const newEmail = emailService.createEmail(subject, body, mail);
    console.log('New Email:', newEmail);
    try {
        await emailService.save(newEmail);
        console.log('Email saved successfully!');
      } catch (error) {
        console.error('Error saving email:', error);
      }
  }

  return (
    <div>
      <h1>New Email</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">Send to:</label><br />
        <input
          type="email"
          id="mail"
          value={mail}
          onChange={(event) => setMail(event.target.value)} 
        /><br />
        <label htmlFor="subject">Subject:</label><br />
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        /><br />
        <label htmlFor="body">Body:</label><br />
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows="4"
          cols="50"
        /><br /><br />
        <input type="submit" value="Send" />
        <Link to="/email">Go back</Link>
      </form>
    </div>
  );
}
