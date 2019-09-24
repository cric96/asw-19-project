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
const passwordConfirmRule = [ 
    v => !!v || "il campo conferma password è obbligatorio",
    //TODO -- check if password match with confirm password through a rule set
];

function userPropsBuilder(user) {
   return [
       {
        propertyName : "uid",
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
       propertyRule : generalRule,
       propertyLabel : "nome",
       editable : true
    },
    {
        propertyName : "surname",
        propertyRule : generalRule,
        propertyLabel : "cognome",
        editable : true
    },
    {
        propertyName : "nickname",
        propertyRule : generalRule,
        propertyLabel : "nickname",
        editable : true
     }
   ] 
}

export const userPropsFilteredBuilder = (user, ...requestedUserPropsArray) => {
    return userPropsBuilder(user).filter((el)=>requestedUserPropsArray.includes(el.propertyName))
}
