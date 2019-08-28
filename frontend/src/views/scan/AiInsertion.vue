<template>
    <v-btn :loading='waitingImage'/>
</template>
<script>
export default {
    data: () => ({
        waitingImage : true
    }),
    props: {
        image : File
    },
    mounted() {
        console.log(this.image)
    }
}
</script>