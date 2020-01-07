
import * as messages from "@/resource/messages"
const generalRule =  [v => !!v || messages.MANDATORY_FIELD];
const emailRule = [ 
    v => !!v || messages.EMAIL_MANDATORY,
    v => /.+@.+/.test(v) || messages.EMAIL_INVALID
];
export const passwordRule = [ 
    v => !!v || messages.PASSWD_MANDATORY,
    v =>  v!==null && v!==undefined && v.length >= 6 || messages.PASSWD_INVALID
];

function passwordConfirmBuilder(user) {
    return [
        v => !!v || messages.PASSWD_MANDATORY,
        v => {
            return v == user.password || messages.CONFIRM_PASSWD_INVALID
        }
    ]
}

function userPropsBuilder(user) {
   return [
       {
            propertyName : "firebase_uid",
            propertyRule : generalRule,
            propertyLabel : "ID",
            prependedIcon: "undefined",
            editable: false
        },
        {
            propertyName : "email",
            propertyRule : emailRule, 
            propertyLabel : "e-mail",
            prependedIcon: "email",
            editable : false
        },
        {
            propertyName : "password",
            propertyRule : passwordRule,
            propertyLabel : "password",
            prependedIcon: "lock",
            editable : true
        },
        {
            propertyName : "passwordConfirm",
            propertyRule : passwordConfirmBuilder(user),
            propertyLabel : "password confirmation",
            prependedIcon: "check",
            editable : true
        },
        {
            propertyName : "name",
            propertyRule : [],
            propertyLabel : "name",
            prependedIcon: "person",
            editable : true
        },
        {
            propertyName : "surname",
            propertyRule : [],
            propertyLabel : "surname",
            prependedIcon: "person",
            editable : true
        },
        {
            propertyName : "nickname",
            propertyRule : [],
            propertyLabel : "nickname",
            prependedIcon: "perm_identity",
            editable : true,
        }
   ] 
}

export const userPropsFilteredBuilder = (user, ...requestedUserPropsArray) => {
    return userPropsBuilder(user).filter((el)=>requestedUserPropsArray.includes(el.propertyName))
}
