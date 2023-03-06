import { api, handleError } from 'helpers/api';



const logoutRequest = async (history) => {

    const token = localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    api.get('/logout', config).then(() => {
        localStorage.removeItem('token');
        history.push("/login");

    })

}

export default logoutRequest;