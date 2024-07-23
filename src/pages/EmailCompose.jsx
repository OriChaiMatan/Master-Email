import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { IoIosResize } from "react-icons/io"
import { CgCompressRight } from "react-icons/cg"
import { IoCloseSharp } from "react-icons/io5"
import { GoogleMap } from "../cmps/GoogleMap"

export function EmailCompose() {
  const navigate = useNavigate()
  const context = useOutletContext()
  const { emailId } = useParams()

  const [email, setEmail] = useState(emailService.createEmail())
  const [isMinimized, setIsMinimized] = useState(false)
  const [isResized, setIsResized] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [senderLocation, setSenderLocation] = useState(null)

  useEffect(() => {
    if (emailId) loadEmail()
  }, [])

  useEffect(() => {
    const saveTimeout = setTimeout(saveDraft, 5000);
    return () => clearTimeout(saveTimeout);
  }, [email])

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
    //console.log('name:', name, 'value:', value);
    setEmail(prevEmail => ({ ...prevEmail, [name]: value }));
  }

  async function onSaveEmail(ev) {
    ev.preventDefault();
    try {
      if (email.id) await context.onUpdateEmail({ ...email, sentAt: emailService.getCurrentTime(), senderLocation });
      else await context.onAddEmail({ ...email, sentAt: emailService.getCurrentTime(), senderLocation });
      navigate(-1);
      showSuccessMsg('Email sent successfully');
    } catch (err) {
      console.log('Had issues sending email', err);
      showErrorMsg('Could not send email');
    }
  }

  async function saveDraft() {
    try {
      if (!email.sentAt) await context.onUpdateEmail(email);
    } catch (err) {
      console.log('Had issues saving draft', err);
    }
  }

  function toggleMapVisibility() {
    setShowMap(!showMap);
    if (!showMap) {
      // Get sender's location
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setSenderLocation({ latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
          showErrorMsg('Error getting your location');
        }
      );
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

            <button className="close-btn" onClick={() => navigate(-1)}><IoCloseSharp /></button>
          </div>
        </div>
        {!isMinimized && (
          <form onSubmit={onSaveEmail}>
            <div className="email-compose-main">
              <input type="text" className="send-to-input" id="sendTo" name="sendTo" placeholder="Recipients" value={email.sendTo} onChange={handleChange} />
              <input type="text" className="subject-input" id="subject" name="subject" placeholder="Subject" value={email.subject} onChange={handleChange} />
              <textarea className="body-input" id="body" name="body" cols="70" rows="20" value={email.body} onChange={handleChange} ></textarea>
              <div className="google-map">
                <button type="button" onClick={toggleMapVisibility}>Share my location</button>
                {showMap && <GoogleMap />}
              </div>
              <button className="send-btn">Send</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
