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
        if (value === "") {
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                [name]: "",
            }));
        } else {
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                [name]: name === 'isRead' ? (value === 'true') : value,
            }));
        }
    }
    
    

    return <form className="email-filter" onSubmit={onSubmitFilter} >
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
