import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"

import { IoIosResize } from "react-icons/io"
import { CgCompressRight } from "react-icons/cg"
import { IoCloseSharp } from "react-icons/io5"

export function EmailCompose() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const { emailId } = useParams()

  const [email, setEmail] = useState(emailService.createEmail())
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResized, setIsResized] = useState(false);

  useEffect(() => {
    if (emailId) loadEmail()
  }, [])

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId)
      setEmail(email)
    } catch (err) {
      console.log('had issues loading email', err);
    }
  }

  function handleChange({ target }) {
    const { value, name } = target;
    console.log('name:', name, 'value:', value);
    setEmail(prevEmail => ({ ...prevEmail, [name]: value }));
  }

  async function onSaveEmail(ev) {
    ev.preventDefault()
    try {
      if (email.id) await context.onUpdateEmail(email)
      else await context.onAddEmail(email)
      navigate('/')
    } catch {
      console.log('Had issues saving email', err);
    }
  }

  return (
    <section className={`email-compose ${isMinimized ? "minimized" : ""} ${isResized ? "resized" : ""}`}>
      <div>
        <div className="email-compose-header">
          <h1>New Message</h1>
          <div className="email-compose-action">
            <button className="minimized-normal" onClick={() => setIsMinimized(!isMinimized)}>{isMinimized ? "-" : "_"}</button>
            <button className="compose-size" onClick={() => {
    if (!isMinimized) {
        setIsResized(!isResized);
    } else {
        setIsMinimized(false); // Ensure modal is not minimized when resizing
        setIsResized(!isResized);
    }
}}>
    {isResized ? <IoIosResize /> : <CgCompressRight />}
</button>

            <Link to="/"><button className="close-btn"><IoCloseSharp /></button></Link>
          </div>
        </div>
        {!isMinimized && (
          <form onSubmit={onSaveEmail}>
            <div className="email-compose-main">
              <input type="text" className="send-to-input" id="sendTo" name="sendTo" placeholder="Recipients" value={email.sendTo} onChange={handleChange} />
              <input type="text" className="subject-input" id="subject" name="subject" placeholder="Subject" value={email.subject} onChange={handleChange} />
              <textarea className="body-input" id="body" name="body" cols="70" rows="20" value={email.body} onChange={handleChange} ></textarea>
              <button className="send-btn">Send</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
