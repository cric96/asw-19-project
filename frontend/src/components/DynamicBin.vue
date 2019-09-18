<template>
    <v-card outlined>
        <v-card-title primary-title>{{binTitle}}</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
            <v-layout row wrap justify-center>
                <canvas ref="canvasRect" id="canvas_rect"></canvas>
                <canvas ref="hiddenMask" id="hidden_mask" ></canvas>
            </v-layout>
            <v-layout row wrap justify-center>
                <h6 class="headline font-weight-light">Collected: {{bin.collected}}</h6> <!-- or font-weight-thin? -->
            </v-layout>
        </v-container>
    </v-card>
    
</template>

<style scoped>
#hidden_mask {
    display: none;
}
.canvas {
    max-width: 100%;
    height: auto;
}
</style>

<script>
const maskUrl = 'https://i.ibb.co/bRmhY52/trash-clip.png'
const binUrl = 'https://i.ibb.co/fDXhsy7/trash.png'

import Bin from '@/model/bin'

export default {
    name: 'DynamicBin',
    props: {
        bin: {
            type: Bin,
            required: true
        }
    },
    data:() => ({
        maskImage: null,
        binImage: null
    }),
    watch: {
        bin: function(newBin) {
            this.draw(newBin.color)
        }
    },
    mounted() {
        this.draw(this.bin.color)
    },
    computed: {
        binTitle: function(){
            return this.bin.categories.reduce((acc, current) => acc + ", " + current)
        }
    },
    methods: {
        async draw(color) {
            let canvas = this.$refs.canvasRect
            let ctx = this.createCanvasContext(this.$refs.canvasRect, true)
            let maskCtx = this.createCanvasContext(this.$refs.hiddenMask, true)
            // save the status for restore it after draw, restore to default globalCompositeOperation
            ctx.save()
            maskCtx.save()

            // load images
            await this.loadImages()

            // draw colored pattern
            maskCtx.fillStyle = color
            maskCtx.fillRect(0, 0, canvas.width, canvas.height)
            maskCtx.globalCompositeOperation = "destination-in"
            this.drawImageScaled(this.maskImage, maskCtx)
            //maskCtx.drawImage(this.maskImage, 0, 0, canvas.width, canvas.height);

            //ctx.drawImage(this.binImage, 0, 0, canvas.width, canvas.height);
            this.drawImageScaled(this.binImage, ctx)
            ctx.globalCompositeOperation = "overlay"
            this.drawImageScaled(this.$refs.hiddenMask, ctx)
            //ctx.drawImage(this.$refs.hiddenMask, 0, 0, canvas.width, canvas.height);

            ctx.restore()
            maskCtx.restore()
        },
        async loadImages() {
            // load images
            this.binImage = (!this.binImage) ? await this.loadImage(binUrl) : this.binImage
            this.maskImage = (!this.maskImage) ? await this.loadImage(maskUrl) : this.maskImage
        },
        loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.src = url
            })
        },
        createCanvasContext(canvas, clear = false) {
            let ctx = canvas.getContext('2d')
            if(clear) ctx.clearRect(0, 0, canvas.width, canvas.height)
            return ctx
        },
        drawImageScaled(img, ctx) {
            var canvas = ctx.canvas 
            var hRatio = canvas.width / img.width
            var vRatio =  canvas.height / img.height
            var ratio  = Math.min (hRatio, vRatio)
            var centerShift_x = (canvas.width - img.width * ratio) / 2
            var centerShift_y = (canvas.height - img.height * ratio) / 2
            ctx.drawImage(img, 0,0, img.width, img.height,
                                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
        }
    }
}
</script>