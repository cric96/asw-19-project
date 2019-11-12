<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-text-field
            :value="value"
            @input="$emit('input',$event)"
            name="password"
            :label="passwordLabel"
            prepend-icon="lock"
            :outlined="outlined"
            :required="required"
            :clearable="clearable"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            v-validate="rules"
            :error-messages="errors.collect('password')"
                                  :rules="[]"

        ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field
                      :rules="[]"

            v-if="withConfirmation"
            v-model="passwordConfirmation"
            :label="passwordConfirmationLabel"
            name="confirmPassword"
            prepend-icon="check"
            :outlined="outlined"
            :required="required"
            :clearable="clearable"
            v-validate="confirmationRules"
            :append-icon="showConfirm ? 'visibility' : 'visibility_off'"
            :type="showConfirm ? 'text' : 'password'"
            @click:append="showConfirm = !showConfirm"
            :error-messages="errors.collect('confirmPassword')"
        ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
import { passwordRule } from '../user/userProperties';

export default {
    props: {
        passwordLabel:{
            type:String,
            default:"Password"
        },
        passwordConfirmationLabel:{
            type:String,
            default:"Conferma della password"
        },
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
        showPassword: false,
        showConfirm: false,
        passwordConfirmation:"",
        password:"",          
        rules: {
            required: true,
            min:6
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
                    min: 'Come la password, la sua conferma deve contenere almeno 6 caratteri',
                    confirmed: 'La conferma della password non coincide'
                }
            },
        },
    }),
    
    mounted () {
        const { $validator } = this;
        $validator.localize('it',this.dictionary)
    },
}
</script>

