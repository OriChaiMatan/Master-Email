import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    createEmail,
}

const STORAGE_KEY = 'emails'

_createEmails()

const loggedinUser = { 
    email: 'ori@gmail.com',  
    fullname: 'Ori Chai Matan' 
    }

    async function query(filterBy) {
        let emails = await storageService.query(STORAGE_KEY);
        console.log(emails);
        if (filterBy) {
            const { subject, txt, isRead } = filterBy;
            emails = emails.filter(email => {
                if (subject && !email.subject.toLowerCase().includes(subject.toLowerCase())) {
                    return false;
                }
                if (isRead !== "") {
                    if (isRead !== undefined && email.isRead !== isRead) {
                        return false;
                    }
                }
                return true;
            });
        }
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
        subject: '',
        isRead: false,
        isStarred: false
    }
}

function createEmail(subject = '', body = '', sendTo = '' ) {
    return {
        id: utilService.makeId(length),
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt:  _getCurrentTime(), 
        removedAt: null, // for later use
        from: loggedinUser.email,
        sendTo
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e1', subject: 'Miss you!',  body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt : _getCurrentTime(),  removedAt : null, from: 'momo@momo.com', to: 'ori@gmail.com' },
            { id: 'e2', subject: 'Goin surfing today?',  body: 'Waves are coming!!!', isRead: false, isStarred: false, sentAt : _getCurrentTime(),  removedAt : null, from: 'kellySlater@wsl.com', to: 'ori@gmail.com' },
            { id: 'e3', subject: 'Welcome to facebook',  body: 'Thanks for join us!!!', isRead: true, isStarred: true, sentAt : _getCurrentTime(),  removedAt : null, from: 'facebook@meta.com', to: 'ori@gmail.com' },
            { id: 'e4', subject: 'New Tesla model',  body: 'New Tesla is coming soon, get yours now!!!', isRead: false, isStarred: false, sentAt : _getCurrentTime(),  removedAt : null, from: 'tesla@spacex.com', to: 'ori@gmail.com' },
            { id: 'e5', subject: 'Surfing Collaboration Opportunity',  body: 'Hi I hope this email finds you well. My name is Kelly Slater, and Im reaching out to discuss a potential collaboration opportunity in the world of surfing. Ive been following your work closely and believe that we could create something truly special together Surfing has always been a passion of mine, and Ive dedicated my life to pushing the boundaries of the sport. I believe that by combining our talents and resources, we could innovate in ways that have never been done before. Id love to hear your thoughts and discuss how we can work together to make waves in the surfing community. Please let me know if youre interested in exploring this further.Looking forward to hearing from you.Best regards,Kelly Slater', isRead: false, isStarred: false, sentAt : _getCurrentTime(),  removedAt : null, from: 'kslater@example.com', to: 'ori@gmail.com' },
            { id: 'e6', subject: 'Charity Event Partnership Proposal',  body: 'Dear, I hope this email finds you in good health and spirits. My name is LeBron James, and Im reaching out to discuss a potential partnership for an upcoming charity event.As you may know, giving back to the community has always been important to me. I believe that by joining forces with like-minded individuals and organizations, we can make a real difference in the lives of those in need.Ive been following your work and admire your commitment to philanthropy. I believe that together, we could organize an event that not only raises funds for a worthy cause but also inspires others to get involved.Id love to discuss this further and explore how we can work together to make a positive impact. Please let me know if youre interested in joining forces for this cause.Thank you for considering this opportunity.Warm regards,LeBron James', isRead: false, isStarred: false, sentAt : _getCurrentTime(),  removedAt : null, from: 'ljames@example.com', to: 'ori@gmail.com' }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function _getCurrentTime() {
    var now = new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1; // Month is zero-indexed, so add 1
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if(minutes<10){
        var formattedTime = hours + ':0' + minutes + ' ' + day + '/' + month + '/' + year
    } else{
        var formattedTime = hours + ':' + minutes + ' ' + day + '/' + month + '/' + year 
    }
    return formattedTime;
}




