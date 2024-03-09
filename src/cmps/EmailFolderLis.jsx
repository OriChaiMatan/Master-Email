import { useEffect, useState } from "react"

export function RobotFilterType({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, value } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="robot-filter">
            Choose your type
            <nav value={filterByToEdit.type} onChange={handleChange}
                id="type" name="type" >
                <option value="">Choose a type</option>
                <option value="Cooking">Cooking</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pleasure">Pleasure</option>
                <option value="Office">Office</option>
            </nav>
        </section>
    )
}
