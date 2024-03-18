import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export function useForm(initialState, cb) {
    const [fields, setFields] = useState(initialState)
    
    useEffectUpdate(() => {
        cb?.(fields)
    }, [fields])

    function handleChange({ target }) {
        let { value, name } = target;
        if(name === 'isRead'){
            if (value === 'false'){
                value = false
            } else if(value === 'true'){
                value = true
            } else {
                value = ''
            }
        }
        setFields((prevFields) => ({ ...prevFields, [name]: value }))
    }
    return [fields, handleChange]
}