import * as messages from './messages'

const errors = {
    "auth/weak-password": messages.SIGNUP_ERR_PASS_TOO_SHORT,
    "auth/wrong-password": messages.LOGIN_WRONG_PASSWORD,
    409: messages.SIGNUP_ERR_NICKNAME_CONFLICT,
    "error" : undefined
}


export default function(errorKey) {
    return errors.hasOwnProperty(errorKey) ? errors[errorKey] : errors.error
}