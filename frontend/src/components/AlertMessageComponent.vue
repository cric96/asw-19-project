<template>
    <v-alert v-if="show" :type="type" dismissable dense v-model="show">
        {{ message }}
    </v-alert>
</template>

<script>
export default {
    props:{
        value: Boolean
    },
    data: () => ({
        type: "",
        message: "",
    }),
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    methods: {
        changeConfig: function(newmessage, newtype){
          this.type = newtype;
          this.message = newmessage;
        }
    }
}
</script>
