<!-- TODO: finish and improve this component -->
<template>
    <v-content fluid>
        <v-layout align-center justify-center fill-height>
            <!-- TODO: spiegare il problema e riesportare png -->
            <v-flex lg3 md4 sm7 xs10>
                <div class="logo-animation-box mx-auto">
                    <v-img src="../assets/animationlogo/lens.png" class="overlay rotate-90-ccw" width="300" height="300"/>
                    <v-img src="../assets/animationlogo/recycle.png" class="background focus-on" width="300" height="300"></v-img>
                </div>
                <v-row>
                    <v-col align="center">
                        <div class="display-3 font-weight-thin focus-in-contract" font-wi>Scanbage</div>
                    </v-col>
                </v-row>
            </v-flex>
        </v-layout>
    </v-content>
</template>


<style scoped>
.logo-animation-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-animation-box .background {
  position: relative;
  z-index: 1;
}
.logo-animation-box .overlay {
  position: absolute;
  z-index: 2;
  overflow: visible;
}

/* Animation for text blur effect enter transition */
.focus-in-contract {
	-webkit-animation: focus-in-contract 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: focus-in-contract 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes focus-in-contract {
  0% {
    letter-spacing: 1em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes focus-in-contract {
  0% {
    letter-spacing: 1em;
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}

/* Animation for rotate the lens */
.rotate-90-ccw {
	-webkit-animation: rotate-90-ccw 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: rotate-90-ccw 2.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes rotate-90-ccw {
  0% {
    -webkit-transform: rotate(0) scale(2,2);
  }
  100% {
    -webkit-transform: rotate(-45deg) scale(1,1);
  }
}
@keyframes rotate-90-ccw {
  0% {
    transform: rotate(0) scale(2,2);
  }
  100% {
    transform: rotate(-45deg) scale(1,1);
  }
}
/* Animation for focus the icon*/
.focus-on {
  -webkit-animation: focus-on 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: focus-on 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes focus-on {
  0% {
    -webkit-filter: blur(8px);
  }
  100% {
    -webkit-filter: blur(0px);
  }
}
@keyframes focus-on {
  0% {
    filter: blur(8px);
  }
  100% {
    filter: blur(0px);
  }
}

</style>

<script>
export default {
    name: 'SplashScreen'
}
</script>