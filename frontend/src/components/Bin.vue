<template>
    <div id="canvas-container"></div>
</template>

<script>

export default {
    name: 'Bin',
    data: () => ({
    configKonva: {
        width: 200,
        height: 200
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    }),
    mounted() {
        var stage = new Konva.Stage({
            container: 'canvas-container',
            width: 200,
            height: 200
        });
    },
    props: {
        color: String
    }
}
</script>