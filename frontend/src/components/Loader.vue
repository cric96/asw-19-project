<template>
    <v-flex>
          <div class="loader">
            <span class="trash">
                <span class="shake-top"></span>
                <i></i>
            </span>
        </div>
    </v-flex>
</template>
<script>
export default {
    name : "Loader"
}
</script>
<style scoped>
.loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.trash {
	background:#4caf50;
	width: 33px;
	height: 40px;
	position: relative;
	-webkit-border-bottom-right-radius: 3px;
	-webkit-border-bottom-left-radius: 3px;
	-moz-border-radius-bottomright: 3px;
	-moz-border-radius-bottomleft: 3px;
	border-bottom-right-radius: 3px;
	border-bottom-left-radius: 3px;
}
.trash {
  margin-top : 18px;
  margin-left : 10px;
}
.trash span {
	position: absolute;
	height: 6px;
	background: #4caf50;
	top: -9px;
	left: -5px;
	right: -5px;
	
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.trash span:after {
	content: '';
	position: absolute;
	width: 13px;
	height: 3px;
	background: #4caf50;
	top: -5px;
	
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	left: 13px;
}


.trash i {
	position:relative;
	width: 4px;
	height:25px;
	background:#fff;
	display:block;
	margin:7px auto;
	border-radius: 2px;
}
.trash i:after {
	content: '';
	width: 4px;
	height: 25px;
	background: #fff;
	position: absolute;
	left: -9px;
	border-radius: 2px;
}
.trash i:before {
	content: '';
	width: 4px;
	height: 25px;
	background: #fff;
	position: absolute;
	right: -9px;
	border-radius: 2px;
}

.shake-top {
  -webkit-animation: shake-top 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;
          animation: shake-top 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;
}
@-webkit-keyframes shake-top {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 0;
            transform-origin: 50% 0;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
}
@keyframes shake-top {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 0;
            transform-origin: 50% 0;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
}
</style>