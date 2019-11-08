<template>
    <div id="app">
        <v-app id="inspire">
            <v-form >
                <v-container grid-list-sm fluid>
                    <v-layout >
                        <v-flex xs12 sm6>
                            <v-text-field v-model="form.password" v-bind="password.primary.props" v-validate="password.primary.rules"
                                            :error-messages="errors.collect(password.primary.props.name)" />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field v-model="form.passconf" v-bind="password.confirm.props" v-validate="password.confirm.rules"
                                            :error-messages="errors.collect(password.confirm.props.name)"/>
                        </v-flex>
                    </v-layout>
                </v-container>    
            </v-form>
        </v-app>
    </div>
</template>

<script>
const dictionary = {
		custom: {
			password: {
				required: 'Account Password is required',
				min:'AAAA'
			},
			passconf: {
				required: 'Account Password is required',
				min:'bbb',
				confirmed: 'Password confirmation does not match Account Password',
			}}
};

export default {
	data: scope => ({
		form: {
				password: null,
				passconf: null,
			},
			
			password: { 
				primary: {
					props:{
						name: 'password', 
						label: "Account Password",

						placeholder: "Account Password",
						required: true,
					},

					rules: {
						required: () => 'Hi.',
						min:6
					},
				},
				
				confirm: {
					props:{
						name: 'passconf', 
						label: "Confirm Password",

						placeholder: "Password confirmation",
						required: true,
					},
					rules: {
						required: true,
						min:6,
						confirmed: 'password',
					},
				},
			},
	}),
	mounted() {
        const { $validator } = this;
        console.log($validator)
		$validator.localize(dictionary);
	}
}
</script>
