import { isProduction } from 'helpers/isProduction'

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production App Engine URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomainSocket = () => {
    const prodUrl = 'http://35.225.17.177:9092'
    const devUrl = 'http://localhost:9092'

    return isProduction() ? prodUrl : devUrl
}
