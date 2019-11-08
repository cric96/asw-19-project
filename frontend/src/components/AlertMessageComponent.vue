<template>
    <v-alert v-if="show" :text="text" :type="type" dismissable dense v-model="show">
        {{ message }}
    </v-alert>
</template>

<script>
export default {
    props:{
        value: Boolean,
        text: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        type: "",
        message: "",
    }),
    computed: {
        show: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        changeConfig: function(newmessage, newtype){
          this.type = newtype
          this.message = newmessage
        },
        showError: function(newmessage) {
            this.changeConfig(newmessage, "error")
        },
        showSuccess: function(newmessage) {
            this.changeConfig(newmessage, "success")
        }
    }
}
</script>
