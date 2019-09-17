const generalRule =  [v => !!v || "Questo campo è obbligatorio"];
const emailRule = [ 
    v => !!v || "il campo E-mail è obbligatorio",
    v => /.+@.+/.test(v) || "L'e-mail deve essere valida"
];
const passwordRule = [ 
    v => !!v || "il campo password è obbligatorio",
    v => v.lenght() >= 6 || "La password deve essere almeno di 6 caratteri"
];

let userProps = [
   {
        propertyName : "uid",
        propertyRule : generalRule,
        editable: false
   },
   {
        propertyName : "email",
        propertyRule : emailRule, 
        editable : false
   },
   {
       propertyName : "password",
       propertyRule : passwordRule,
       editable : true
   },
   {
       propertyName : "name",
       propertyRule : generalRule,
       editable : true
   },
   {
        propertyName : "surname",
        propertyRule : generalRule,
        editable : true
    },
    {
        propertyName : "name",
        propertyRule : generalRule,
        editable : true
    },
    {
         propertyName : "nickname",
         propertyRule : generalRule,
         editable : true
     }

];

export const userProps = (requestedUserPropsArray) => {
    return userProps.filter((el)=>requestedUserPropsArray.includes(el.propertyName))
}