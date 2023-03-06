import { api, handleError } from 'helpers/api';

const logoutRequest = async (history) => {


    api.get('/logout').then(() => {
        localStorage.removeItem('token');
        history.push("/login");

    })

}

export default logoutRequest;