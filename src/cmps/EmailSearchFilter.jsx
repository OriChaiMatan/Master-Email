import React, { useEffect, useState } from 'react'
import { MdSearch } from "react-icons/md";


export function EmailSearchFilter({ filterBy, onSetFilter }) {
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
                [name]: name === 'subject' ? value : prevFilter[name]
            }));
        }
    }

    return <form className="email-filter" onSubmit={onSubmitFilter} >
        <label>
            <input
                className="search-bar"
                type="text"
                placeholder="Search mail"
                value={filterByToEdit.subject}
                name="subject"
                onChange={handleChange}
            />
        </label>
    </form>
}
