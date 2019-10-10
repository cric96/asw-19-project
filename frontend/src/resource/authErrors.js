import * as messages from './messages'

const signInErrorMap = {
    "auth/wrong-password": messages.LOGIN_WRONG_PASSWORD,
    "error" : messages.LOGIN_ERROR
}

const signUpErrorMap = {
    "auth/weak-password": messages.SIGNUP_ERR_PASS_TOO_SHORT,
    "auth/email-already-in-use": messages.SIGNUP_ERR_EMAIL_CONFLICT,
    409: messages.SIGNUP_ERR_NICKNAME_CONFLICT,
    "error" : messages.SIGNUP_ERR
}

function getError(errorMap, errorKey) {
    return errorMap.hasOwnProperty(errorKey) ? errorMap[errorKey] : errorMap.error
}

export const signUpError = function(errorKey) {
    return getError(signUpErrorMap, errorKey)
}

export const signInError = function(errorKey) {
    return getError(signInErrorMap, errorKey)
}