<style scoped>
  .container {
    position: fixed;
    right: 50px;
    bottom: 100px;
    color: #00adb5;
    cursor: pointer;
    width: 200px;
    height: 250px;
  }
  .container #vuepress-live2d {
    position: fixed;
    opacity: 0.9;
    right: 0px;
    bottom: -20px;
    z-index: 99999;
    pointer-events: none;
  }
</style>

<template>
  <div class="container" v-show="isLoaded" @click="scrollToTop">
    <canvas
      id="vuepress-live2d"
      :width="style.width"
      :height="style.height"
      class="live2d"
    ></canvas>
  </div>
</template>

<script>
  import live2dJSString from "./live2d";
// 'https://assets-1251880938.cos.ap-guangzhou.myqcloud.com/live2d-widget-model-haru/02/assets/haru02.model.json'
  export default {
    data() {
      return {
        isLoaded: true,
        model: this.config.model,
        style: {
          width: 280,
          height: 250
        }
      };
    },
    mounted() {
      this.init();

      this.$router.afterEach((to, from) => {
        if (to.path !== from.path) {
          this.init();
        }
      });
    },
    methods: {
      init() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? true
          : false;
        if (isMobile) {
          this.isLoaded = false;
          return console.log("mobile do not load model");
        }

        if (!window.loadlive2d) {
          const script = document.createElement("script");
          script.innerHTML = live2dJSString;
          document.body.appendChild(script);
        }

        this.style = {
          width: (150 / 1424) * document.body.clientWidth,
          height: ((150 / 1424) * document.body.clientWidth) / 0.8
        };

        setTimeout(() => {
          window.loadlive2d(
            "vuepress-live2d",
             this.model
          );
        });
      },
      scrollToTop () {
      const top  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      if(top > 300) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    }
  };
</script>
