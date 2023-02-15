import BaseURL from "./BaseURL"

export const getRegistrations = async token =>
{
    return fetch(BaseURL + '/registrations/get', 
    {
        headers: 
        {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token
        },
    }).then(data => data)
    .catch
    (
        error => console.error(error)
    );
}

export const createRegistration = async (data, token) =>
{
    return fetch(BaseURL + '/registrations/create', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    }).then(data => data)
    .catch
    (
        error => console.error(error)
    );
}