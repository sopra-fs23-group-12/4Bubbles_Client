import { isProduction } from 'helpers/isProduction'

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production App Engine URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomainSocket = () => {
    // const prodUrl = 'https://sopra-fs23-group-12-server.ew.r.appspot.com/'
    const prodUrl = 'http://sopra.dkueffer.ch:9092'
    const devUrl = 'http://142.250.203.116:9092'

    return isProduction() ? prodUrl : devUrl
}
