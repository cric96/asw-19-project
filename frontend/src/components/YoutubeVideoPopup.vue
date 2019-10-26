<template>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <div class="popup-style">
                <v-toolbar height="60px" dark color="primary">
                    <v-btn icon dark @click="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Video</v-toolbar-title>
                </v-toolbar>  
                <v-layout class="video-container" align-center fill-height >
                    <iframe ref="youtubeVideo" v-if="dialog" class="full-width-video" :src="video"></iframe> 
                    <loader class="trash-loader" v-if="videoLoading"/>
                </v-layout>
            </div>
        </v-dialog>
    </template>
<script>
import Loader from './Loader'
export default {
    name : "YoutubeVideoPopup",
    props : {
        video : {
            type : String
        }
    },
    components: {
        "loader" : Loader
    },
    data : () => ({
        videoLoading : false,
        dialog : false
    }),
    methods : {
        open() {
            this.dialog = true
            this.videoLoading = true
            this.$nextTick(() => {
                this.$refs.youtubeVideo.onload = () => {
                    this.$data.videoLoading = false
                }
            })
        },
        close() {
            this.dialog = false
            this.value = false
        }
    }
}
</script>
<style scoped lang="scss">
.video-container {
  background-color: white;
  height: calc( 100vh - 60px );
}
.full-width-video {
  min-width: 100%;
  height: calc( 100vh - 60px );
  position: absolute;
  background-color: white
}
.popup-style {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  height: 100%;
}
</style>