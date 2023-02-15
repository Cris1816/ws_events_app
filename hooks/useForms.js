import { useState } from 'react';
export const useForm = initState => 
{
    const [state, setState] = useState(initState);
    const onChange = (value, field) => 
    {
        setState(Object.assign(Object.assign({}, state), { [field]: value }));
    };
    return Object.assign(Object.assign({}, state), { form: state, onChange });
};