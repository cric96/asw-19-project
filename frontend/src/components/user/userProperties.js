const generalRule =  [v => !!v || "Questo campo è obbligatorio"];
const emailRule = [ 
    v => !!v || "il campo E-mail è obbligatorio",
    v => /.+@.+/.test(v) || "L'e-mail deve essere valida"
];
const passwordRule = [ 
    v => !!v || "il campo password è obbligatorio",
    v =>  v!==undefined && v.length > 6 || "La password deve essere almeno di 6 caratteri"
];

function passwordConfirmBuilder(user) {
    return [
        v => !!v || "il campo password è obbligatorio",
        v => {
            console.log(user.password)
            return v == user.password || "La figa deve essere almeno di 6 caratteri"
        }
    ]
}

function userPropsBuilder(user) {
   return [
       {
            propertyName : "firebase_uid",
            propertyRule : generalRule,
            propertyLabel : "ID",
            editable: false
        },
        {
            propertyName : "email",
            propertyRule : emailRule, 
            propertyLabel : "e-mail",
            editable : false
        },
        {
            propertyName : "password",
            propertyRule : passwordRule,
            propertyLabel : "password",
            editable : true
        },
        {
            propertyName : "passwordConfirm",
            propertyRule : passwordConfirmBuilder(user),
            propertyLabel : "password di conferma",
            editable : true
        },
        {
            propertyName : "name",
            propertyRule : [],
            propertyLabel : "nome",
            editable : true
        },
        {
            propertyName : "surname",
            propertyRule : [],
            propertyLabel : "cognome",
            editable : true
        },
        {
            propertyName : "nickname",
            propertyRule : [],
            propertyLabel : "nickname",
            editable : true
        }
   ] 
}

export const userPropsFilteredBuilder = (user, ...requestedUserPropsArray) => {
    return userPropsBuilder(user).filter((el)=>requestedUserPropsArray.includes(el.propertyName))
}
