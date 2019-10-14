<template>
    <v-text-field
    :v-model="passwordModel"
    :label="labelDescription"
    :rules="computedRules"
    :prepend-icon="prependIcon"
    outlined
    required
    clearable
    :append-icon="show ? 'visibility' : 'visibility_off'"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
    ></v-text-field>
</template>

<script>
import { passwordRule } from '../user/userProperties';
export default {
    props: {
        toCheck:{
            type: String,
            default: undefined,
            required:false
        },
        passwordModel: {
            type: String,
            required: true
        },
        labelDescription: {
            type: String,
            required: true
        },
        prependIcon: {
            type: String
        },
        passwordRules: {
            type: Array
        }
    },
    data: () => ({
        show: false,
        changingPassword: ""
    }),
    computed:{
        computedRules: function(){
            var newRules = Object.assign([],this.passwordRules)
            if (this.toCheck != undefined) {
                newRules.push(this.passwordConfirmationRule)
                return newRules
            }else{
                return this.passwordRules
            }  
        },
        passwordConfirmationRule: function(){
            return v => {return v == this.changingPassword || "La password di conferma non coincide con quella sopra inserita"}
        } 
    },
    watch: {
        toCheck: {
            immediate: true,
            handler: function(val) {
                this.changingPassword = val;
            }
        }
    }
}
</script>

