import { api } from 'helpers/api';

const logoutRequest = async (history) => {

    const headers = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    api.get('/logout', headers).then(() => {
        localStorage.removeItem('token');
        history.push("/login");

    })

}

export default logoutRequest;