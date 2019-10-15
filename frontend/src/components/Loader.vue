<template>
    <v-flex>
        <div class="loader" >
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
	background:#ff6873;
	width: 66px;
	height: 80px;
	position: relative;
	-webkit-border-bottom-right-radius: 6px;
	-webkit-border-bottom-left-radius: 6px;
	-moz-border-radius-bottomright: 6px;
	-moz-border-radius-bottomleft: 6px;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}
.trash {
  margin-top : 35px;
  margin-left : 20px;
}
.trash span {
	position: absolute;
	height: 12px;
	background: #ff6873;
	top: -19px;
	left: -10px;
	right: -10px;
	
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
.trash span:after {
	content: '';
	position: absolute;
	width: 27px;
	height: 7px;
	background: #ff6873;
	top: -10px;
	
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	left: 27px;
}


.trash i {
	position:relative;
	width: 5px;
	height:50px;
	background:#fff;
	display:block;
	margin:14px auto;
	border-radius: 5px;
}
.trash i:after {
	content: '';
	width: 5px;
	height: 50px;
	background: #fff;
	position: absolute;
	left: -18px;
	border-radius: 5px;
}
.trash i:before {
	content: '';
	width: 5px;
	height: 50px;
	background: #fff;
	position: absolute;
	right: -18px;
	border-radius: 5px;
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