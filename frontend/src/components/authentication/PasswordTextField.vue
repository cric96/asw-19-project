<template>
    <div>
    <v-text-field
        v-model="password"
        v-bind="passwordProps"
        prepend-icon="lock"
        :outlined="outlined"
        :required="required"
        :clearable="clearable"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        v-validate="rules"
        :error-messages="errors.collect('password')"
    ></v-text-field>
    <v-text-field
        v-if="withConfirmation"
        v-model="passwordConfirmation"
        v-bind="passwordConfProps"
        prepend-icon="check"
        :outlined="outlined"
        :required="required"
        :clearable="clearable"
        v-validate="confirmationRules"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        :error-messages="errors.collect('confirmPassword')"
    ></v-text-field>
    </div>
</template>

<script>
import { passwordRule } from '../user/userProperties';

export default {
    props: {
        withConfirmation: {
            type:Boolean,
            default:false
        },
        outlined: {
            type:Boolean,
            default:false
        },
        required: {
            type:Boolean,
            default:false
        },
        value: {
            type: String
        },
        clearable: {
            type:Boolean,
            default:false
        }
    },
    data: scope => ({
        show: false,
        passwordConfirmation:"",
        password:"",
        passwordProps:{
            name: 'password', 
            label: "Password",
            required: true,
        },
         passwordConfProps:{
            label:"Conferma della password",
            name:"confirmPassword",
            required: true,
        },           
        rules: {
            required: () => 'Hi.',
		},
        confirmationRules: {
            required: true,
            min:6,
            confirmed: 'password',
        },
        dictionary: {
            custom: {
                password: {
                    required: 'Password è un campo obbligatorio',
                    min: 'la password deve contenere almeno 6 caratteri'
                },
                confirmPassword: {
                    required: 'La conferma della password è obbligatoria',
                    min: 'come la password, la sua conferma deve contenere almeno 6 caratteri',
                    confirmed: 'La conferma della password non coincide'
                }
            },
        },
    }),
    
    mounted () {
        const { $validator } = this;
        $validator.localize(this.dictionary)
    },
}
</script>

