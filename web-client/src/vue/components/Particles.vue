<template>
  <div id="particles-js"></div>
</template>

<script>
import "particles.js";

export default {
  name: "particles-component",
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 120, density: { enable: true, value_area: 800 } },
          color: { value: "#398aac" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#090909" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#bbacac",
            opacity: 0.3687847739990702,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      });
    }
  }
};
</script>

<style lang="scss">
#particles-js {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  background: rgb(206, 204, 255);
  background: linear-gradient(
    180deg,
    rgba(206, 204, 255, 1) 0%,
    rgba(242, 251, 255, 1) 50%,
    rgba(140, 226, 244, 1) 100%
  );
}
</style>
