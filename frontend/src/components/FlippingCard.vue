<template>
  <div :class="value ? 'flip-container flipped': 'flip-container'" v-on="mouseEvents">
    <div class="flipper center">
      <v-flex class="front">
        <slot name="front"></slot>
      </v-flex>
      <v-flex class="back">
        <slot name="back"></slot>
      </v-flex>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
</style>

<script>
export default {
  name: 'FlippingCard',
  props: {
    value: {
      type: Boolean,
      default() { return false }
    },
    mouseover: { // if true, enable the on hover mouse feature
      type: Boolean,
      default() { return false }
    },
    mouseclick: {
      type: Boolean,
      default() { return false }
    }
  },
  computed: {
    mouseEvents() { // computed listeners for mouse over/leave
      if(this.mouseover) {
        return {
          mouseover: e => this.$emit('input', true),
          mouseleave:e => this.$emit('input', false),
        }
      }
      return {}
    }
  }
};
</script>

<style type='text/css' scoped>

.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  transform: perspective(1000px);
  transform-style: preserve-3d;
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}
</style>