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
        if (filterBy) {
            const { status, txt, isRead } = filterBy;
            emails = emails.filter(email => {
                // Filtering by status
                if (status && email.status !== status) {
                    return false;
                }
                // Filtering by text (case insensitive)
                if (txt && !email.subject.toLowerCase().includes(txt.toLowerCase())) {
                    return false;
                }
                // Filtering by read status
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

function createEmail(subject, body, sendTo) {
    return {
        id: utilService.makeId(length),
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt:  _getCurrentTime(), 
        removedAt: null, // for later use
        from: loggedinUser.email,
        sendTo: sendTo
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e1', subject: 'Miss you!',  body: 'Would love to catch up sometimes', isRead: false, isStarred: false, sentAt : 1551133930594,  removedAt : null, from: 'momo@momo.com', to: 'ori@gmail.com' },
            { id: 'e2', subject: 'Goin surfing today?',  body: 'Waves are coming!!!', isRead: false, isStarred: false, sentAt : 1551133930594,  removedAt : null, from: 'kellySlater@wsl.com', to: 'ori@gmail.com' },
            { id: 'e3', subject: 'Welcome to facebook',  body: 'Thanks for join us!!!', isRead: true, isStarred: true, sentAt : 1551133930594,  removedAt : null, from: 'facebook@meta.com', to: 'ori@gmail.com' },
            { id: 'e4', subject: 'New Tesla model',  body: 'New Tesla is coming soon, get yours now!!!', isRead: false, isStarred: false, sentAt : 1551133930594,  removedAt : null, from: 'tesla@spacex.com', to: 'ori@gmail.com' }
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

    var formattedTime = hours + ':' + minutes + ' ' + day + '/' + month + '/' + year 

    return formattedTime;
}




