const generalRule =  [v => !!v || "Questo campo è obbligatorio"];
const emailRule = [ 
    v => !!v || "il campo E-mail è obbligatorio",
    v => /.+@.+/.test(v) || "L'e-mail deve essere valida"
];
export const passwordRule = [ 
    v => !!v || "il campo password è obbligatorio",
    v =>  v!==undefined && v.length >= 6 || "La password deve essere almeno di 6 caratteri"
];

function passwordConfirmBuilder(user) {
    return [
        v => !!v || "il campo password è obbligatorio",
        v => {
            return v == user.password || "La password di conferma non coincide con quella sopra inserita"
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
            propertyLabel : "password di conferma",
            prependedIcon: "check",
            editable : true
        },
        {
            propertyName : "name",
            propertyRule : [],
            propertyLabel : "nome",
            prependedIcon: "person",
            editable : true
        },
        {
            propertyName : "surname",
            propertyRule : [],
            propertyLabel : "cognome",
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
