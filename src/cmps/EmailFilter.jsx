import React, { useEffect, useState } from 'react';
import { useForm } from '../customHooks/useForm';


export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)

    function onSubmitFilter(ev) {
        ev.preventDefault();
        console.log('filterByToEdit', filterByToEdit);
        onSetFilter(filterByToEdit);
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
