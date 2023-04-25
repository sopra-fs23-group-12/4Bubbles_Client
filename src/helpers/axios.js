import { api, headers } from 'helpers/api';

const logoutRequest = async (history) => {
    
    api.get('/logout', headers()).then(() => {
        localStorage.clear();
        history.push("/login");

    })

}

export default logoutRequest;