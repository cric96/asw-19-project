import { signInErrorMap, signUpErrorMap } from './authErrors'
import { creationBuildingError, editBuildingError } from './buildingErrors'

function errorOrDefault(errorKey, errorMap, defaultError = null) {
    return errorMap.hasOwnProperty(errorKey) ? errorMap[errorKey] : (defaultError || errorMap.default)
}

export const auth = {
    signUpError: (errorKey) => errorOrDefault(errorKey, signUpErrorMap),
    signInError: (errorKey) => errorOrDefault(errorKey, signInErrorMap)
}

export const building = {
    creationError: (errorKey) => errorOrDefault(errorKey, creationBuildingError),
    editError: (errorKey) => errorOrDefault(errorKey, editBuildingError)
}