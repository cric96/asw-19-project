import * as messages from './messages'

export const signInErrorMap = {
    "auth/wrong-password": messages.LOGIN_WRONG_PASSWORD,
    default : messages.LOGIN_ERROR
}

export const signUpErrorMap = {
    "auth/weak-password": messages.SIGNUP_ERR_PASS_TOO_SHORT,
    "auth/email-already-in-use": messages.SIGNUP_ERR_EMAIL_CONFLICT,
    409: messages.SIGNUP_ERR_NICKNAME_CONFLICT,
    default : messages.SIGNUP_ERR
}