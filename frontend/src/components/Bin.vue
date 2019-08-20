<template>
   <v-stage ref="stage" :config="stageSize">
    <v-layer ref="hidden_layer" :visible="false">
        <v-image :config="maskImage"></v-image>
        <v-rect :config="color"></v-rect>
    </v-layer>
    <v-layer>
        <v-image :config="imageObject"></v-image>
        
    </v-layer>
  </v-stage>
</template>

<script>
/* TODO: to finisch, this component allow to create colored bin dynamically */
export default {
    name: 'Bin',
    data() {
        return {
            stageSize: {
                width: 200,
                height: 200
            },
            mask: null,
            image: null,
            color: {
                width: 200,
                height: 200,
                fill: 'red',
                globalCompositeOperation: 'source-in'
            }
        };
    },
    computed: {
        imageObject: function() {
            return {
                image: this.image,
                width: 200,
                height: 200
            }
        },
        maskImage: function() {
            return {
                image: this.mask,
                width: 200,
                height: 200
            }
        },
        computedImage: function() {
            return {
                image: this.$refs.hidden_layer,
                width: 200,
                height: 200,
                globalCompositeOperation: 'overlay'
            }
        }
    },
    created() {
        const mask = new Image();
        mask.src = 'https://i.ibb.co/bRmhY52/trash-clip.png';
        mask.onload = () => {
            this.mask = mask;
        };
        const image = new Image();
        image.src = 'https://i.ibb.co/fDXhsy7/trash.png';
        image.onload = () => {
            this.image = image;
        }
    }
}   

/*export default {
    name: 'Bin',
    data: () => ({
        image: null,
        configKonva: {
            width: 200,
            height: 200
        }
    }),
    created() {
        const image = new window.Image();
        image.src = 'https://img.pngio.com/recycle-bin-png-images-vectors-and-psd-files-free-download-on-recycling-bin-png-black-and-white-360_360.png';
        image.onLoad = () => {
            this.image = image;
        }
    },
    props: {
        color: String
    }
}*/
</script>