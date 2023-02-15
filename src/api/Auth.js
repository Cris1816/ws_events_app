import BaseURL from "./BaseURL"

export const logoutUser = async token =>
{
    return fetch(BaseURL + '/logout', 
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

export const loginUser = async credentials =>
{
    return fetch(BaseURL + '/login', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(credentials)
    }).then(data => data)
    .catch
    (
        error => console.error(error)
    );
}