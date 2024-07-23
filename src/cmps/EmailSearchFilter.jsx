import React, { useEffect, useState } from 'react'
import { MdSearch } from "react-icons/md";
import { useForm } from '../customHooks/useForm';


export function EmailSearchFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)

    function onSubmitFilter(ev) {
        ev.preventDefault();
        //console.log('filterByToEdit', filterByToEdit);
        onSetFilter(filterByToEdit);
    }

   // console.log(filterByToEdit.subject)//need to check why filterByToEdit.subject comes undifine?
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
