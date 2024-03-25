import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromParams,
    createEmail,
    getCurrentTime
}

const STORAGE_KEY = 'emails'

_createEmails()

const loggedinUser = {
    email: 'ori@gmail.com',
    fullname: 'Ori Chai Matan'
}

async function query(filterBy, folder) {
    let emails = await storageService.query(STORAGE_KEY);
    if (folder) {
        emails = emails.filter(email => {
            if (folder === 'inbox') {
                return ((email.sendTo === loggedinUser.email) && (email.removedAt === null))
            }
            if (folder === 'sent') {
                return ((email.from === loggedinUser.email) && (email.sentAt != null))
            }
            if (folder === 'starred') {
                return ((email.isStarred === true) && (email.removedAt === null))
            }
            if (folder === 'trash') {
                return email.removedAt != null
            }
            if (folder === 'draft') {
                return email.sentAt === null
            }
        });
    }
    if (filterBy) {
        const { subject, isRead } = filterBy;
        if (subject) {
            emails = emails.filter(email => {
                if (email.subject.toLowerCase().includes(subject.toLowerCase())) {
                    return email
                }
            })
        }
        if (isRead !== "" && isRead !== undefined ) {
            //console.log('isRead', isRead);
            emails = emails.filter(email =>  email.isRead === isRead )
        }

    }

    // Sorting emails by sentAt date in descending order
    emails.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
    return emails;
}


function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        subject: "",
        isRead: "",
        isStarred: ""
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    if(filterBy.isRead){
        if (filterBy.isRead === 'false'){
            filterBy.isRead = false
        } else {
            filterBy.isRead = true
        }
        
    }
    //console.log(filterBy, 'filterby');
    return filterBy
}

function createEmail(subject = '', body = '', sendTo = '', senderLocation) {
    return {
        id: utilService.makeId(length),
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        sendTo,
        senderLocation: senderLocation
    }
}

function getCurrentTime() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1; // Month is zero-indexed, so add 1
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (minutes < 10) {
        var formattedTime = hours + ':0' + minutes + ' ' + day + '/' + month + '/' + year
    } else {
        var formattedTime = hours + ':' + minutes + ' ' + day + '/' + month + '/' + year
    }
    return formattedTime;
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e1', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt: getCurrentTime(), removedAt: null, from: 'momo@momo.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            { id: 'e2', subject: 'Goin surfing today?', body: 'Waves are coming!!!', isRead: false, isStarred: false, sentAt: getCurrentTime(), removedAt: null, from: 'kellySlater@wsl.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            { id: 'e3', subject: 'Welcome to facebook', body: 'Thanks for join us!!!', isRead: true, isStarred: true, sentAt: getCurrentTime(), removedAt: null, from: 'facebook@meta.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            { id: 'e4', subject: 'New Tesla model', body: 'New Tesla is coming soon, get yours now!!!', isRead: false, isStarred: false, sentAt: getCurrentTime(), removedAt: null, from: 'tesla@spacex.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            { id: 'e5', subject: 'Surfing Collaboration Opportunity', body: 'Hi I hope this email finds you well. My name is Kelly Slater, and Im reaching out to discuss a potential collaboration opportunity in the world of surfing. Ive been following your work closely and believe that we could create something truly special together Surfing has always been a passion of mine, and Ive dedicated my life to pushing the boundaries of the sport. I believe that by combining our talents and resources, we could innovate in ways that have never been done before. Id love to hear your thoughts and discuss how we can work together to make waves in the surfing community. Please let me know if youre interested in exploring this further.Looking forward to hearing from you.Best regards,Kelly Slater', isRead: false, isStarred: false, sentAt: getCurrentTime(), removedAt: null, from: 'kslater@example.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            { id: 'e6', subject: 'Charity Event Partnership Proposal', body: 'Dear, I hope this email finds you in good health and spirits. My name is LeBron James, and Im reaching out to discuss a potential partnership for an upcoming charity event.As you may know, giving back to the community has always been important to me. I believe that by joining forces with like-minded individuals and organizations, we can make a real difference in the lives of those in need.Ive been following your work and admire your commitment to philanthropy. I believe that together, we could organize an event that not only raises funds for a worthy cause but also inspires others to get involved.Id love to discuss this further and explore how we can work together to make a positive impact. Please let me know if youre interested in joining forces for this cause.Thank you for considering this opportunity.Warm regards,LeBron James', isRead: false, isStarred: false, sentAt: getCurrentTime(), removedAt: null, from: 'ljames@example.com', sendTo: 'ori@gmail.com', folder: 'inbox' },
            {
                id: 'e7',
                subject: 'Invitation to Exclusive Art Exhibition',
                body: 'Dear art enthusiast, You are cordially invited to an exclusive art exhibition showcasing the works of renowned contemporary artists. The event will be held at the prestigious Art Gallery on March 20th at 7:00 PM. Join us for an evening of artistic inspiration, fine wine, and engaging conversations. RSVP by March 15th. We look forward to seeing you there!',
                isRead: true,
                isStarred: true,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'galleryevents@example.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e8',
                subject: 'Congratulations on Your Recent Achievement!',
                body: 'Dear [Recipient], We are thrilled to congratulate you on your recent achievement [specific achievement]. Your hard work, dedication, and talent have truly paid off. This is a testament to your exceptional skills and commitment to excellence. We wish you continued success in all your future endeavors. Keep up the fantastic work!',
                isRead: false,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'achievements@congrats.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e9',
                subject: 'Exclusive Offer for Ori@gmail.com',
                body: 'Dear [Recipient], As a valued customer, we are excited to offer you an exclusive discount on your next purchase. Simply use the code ORI2024 at checkout to enjoy 20% off your entire order. This offer is valid until March 31st. Don\'t miss out on this fantastic opportunity to save on your favorite products!',
                isRead: false,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'promo@discounts.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e10',
                subject: 'Your Monthly Newsletter - March Edition',
                body: 'Dear [Recipient], Welcome to the March edition of our monthly newsletter! In this issue, we cover [topics covered in the newsletter]. We hope you find the articles informative and inspiring. If you have any feedback or suggestions for future editions, we\'d love to hear from you. Thank you for being a valued subscriber!',
                isRead: false,
                isStarred: true,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'newsletter@updates.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e11',
                subject: 'Important Update: Changes to Our Privacy Policy',
                body: 'Dear [Recipient], We are writing to inform you about changes to our privacy policy. These updates are being made to [reason for the changes]. We encourage you to review the updated policy [link to the policy] to understand how these changes may affect you. If you have any questions or concerns, please don\'t hesitate to contact us. Thank you for your attention to this matter.',
                isRead: true,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'privacy@updates.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e12',
                subject: 'Exclusive Invitation to Beta Test Our New App!',
                body: 'Dear [Recipient], You\'ve been selected to participate in the beta testing phase of our new app! As a beta tester, you\'ll have exclusive access to the latest features and updates before the app is officially launched. Your feedback will be invaluable in helping us improve the user experience. To get started, simply download the app [instructions for downloading the app]. We can\'t wait to hear what you think!',
                isRead: true,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'betatest@newapp.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e13',
                subject: 'Reminder: Upcoming Webinar on [Topic]',
                body: 'Dear [Recipient], Just a friendly reminder about our upcoming webinar on [topic]. The webinar will take place on [date] at [time]. Don\'t miss this opportunity to learn from industry experts and gain valuable insights into [topic]. Register now to secure your spot! We look forward to seeing you there.',
                isRead: false,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'webinars@reminders.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e14',
                subject: 'Your Weekly Fitness Tracker Report',
                body: 'Dear [Recipient], Here\'s your weekly fitness tracker report! This week, you\'ve [summary of fitness activities]. Keep up the great work and stay motivated! If you have any questions or need assistance with your fitness goals, don\'t hesitate to reach out to our support team. We\'re here to help you every step of the way.',
                isRead: true,
                isStarred: true,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'fitness@tracker.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e15',
                subject: 'Exclusive VIP Access to Our Annual Sale!',
                body: 'Dear [Recipient], You\'re invited to enjoy exclusive VIP access to our annual sale! Shop the latest trends and enjoy unbeatable discounts on your favorite brands. As a VIP member, you\'ll also receive special perks and bonuses. Don\'t miss this opportunity to upgrade your wardrobe for less. Shop now and save big!',
                isRead: false,
                isStarred: true,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'vip@sale.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            },
            {
                id: 'e16',
                subject: 'Your Monthly Financial Report',
                body: 'Dear [Recipient], Here\'s your monthly financial report for [month/year]. In this report, you\'ll find an overview of your income, expenses, investments, and savings. We encourage you to review the report carefully and reach out to your financial advisor if you have any questions or concerns. Remember, financial planning is key to achieving your long-term goals. Thank you for trusting us with your financial well-being.',
                isRead: true,
                isStarred: false,
                sentAt: getCurrentTime(),
                removedAt: null,
                from: 'finance@reports.com',
                sendTo: 'ori@gmail.com',
                folder: 'inbox'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}






