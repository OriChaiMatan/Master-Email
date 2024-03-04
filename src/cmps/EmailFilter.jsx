import React, { useEffect, useState } from 'react'

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault();
        console.log('filterByToEdit', filterByToEdit);
        onSetFilter(filterByToEdit);
    }

    function handleChange(ev) {
        const { value, name } = ev.target;
    
        // Check if the selected option is "All"
        if (value === "") {
            // If "All" is selected, set isRead to an empty string to show all emails
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                [name]: "",
            }));
        } else {
            // If "Read" or "Unread" is selected, update isRead accordingly
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                [name]: name === 'isRead' ? (value === 'true') : value,
                txt: name === 'subject' ? value : prevFilter.txt
            }));
        }
    }
    
    

    return <form className="email-filter" onSubmit={onSubmitFilter} >
        <label >
            <input
                type="text"
                placeholder="Search by subject"
                value={filterByToEdit.subject}
                name="subject"
                onChange={handleChange}
            />
        </label>

        <label htmlFor="status">Unread emails:</label>
            <select
                id="isRead"
                value={filterByToEdit.isRead}
                name="isRead"
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="false">Unread</option>
                <option value="true">Read</option>
            </select>

        
    </form>
}
