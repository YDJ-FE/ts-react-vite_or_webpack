import { get } from 'lodash-es'
import { message } from 'antd'

const NETWORK_ERRORS_PREFIX = ['network error', 'connect etimedout', 'getaddrinfo enotfound']
const REQUEST_TIMEOUT_PREFIX = ['timeout of ']

/**
 * check if is specific error
 *
 * @param {string} msg
 * @param {('network' | 'timeout')} type
 * @returns
 */
function checkErrorType(msg: string, type: 'network' | 'timeout') {
    msg = msg.toLowerCase()
    const prefixs = type === 'network' ? NETWORK_ERRORS_PREFIX : REQUEST_TIMEOUT_PREFIX
    for (const p of prefixs) {
        if (msg.startsWith(p)) {
            return true
        }
    }
    return false
}

/**
 * define error msg
 *
 * @export
 * @enum {number}
 */
export enum ERROR_TYPE {
    COMMON_NETWORK_ERROR = 'network error',
    NETWORK_OFFLINE = 'you are offline',
    REQUEST_TIMEOUT = 'request timeout'
}

function toastError(e: any) {
    const errMsg: string = get(e, 'reason.response.data.message') || get(e, 'reason.message')
    if (errMsg && typeof errMsg === 'string') {
        if (checkErrorType(errMsg, 'network')) {
            return message.error(ERROR_TYPE.COMMON_NETWORK_ERROR)
        }
        if (checkErrorType(errMsg, 'timeout')) {
            return message.error(ERROR_TYPE.REQUEST_TIMEOUT)
        }
        message.error(errMsg)
    }
}

function handleError(e: any) {
    console.error(e)
    toastError(e)
}

/**
 * catch unhandledrejection and toast
 *
 * @export
 */
export default function catchUnhandledRejection() {
    window.addEventListener('unhandledrejection', handleError)
}
