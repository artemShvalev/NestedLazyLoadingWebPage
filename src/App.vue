

<template>
  <v-app theme="dark" class="transparent-app">
    <!-- Глобальный фон, который видит состояние плеера через Provide/Inject -->
    <div 
      v-if="currentBg" 
      class="global-bg-blur"
      :style="{ backgroundImage: `url('${currentBg}')` }"
    ></div>

    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>


<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from "./components/layout/AppFooter.vue";
import { provide, ref } from 'vue'
import { inject, computed } from 'vue'

const currentBg = inject('currentAlbumCover', null) 
const isGlobalPlaying = ref(false)
provide('isGlobalPlaying', isGlobalPlaying)

</script>

<style>
.transparent-app, 
.transparent-app .v-main {
  background: transparent !important; /* Убиваем стандартный фон везде */
}

.global-bg-blur {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: blur(60px) brightness(0.3);
  transform: scale(1.1);
  z-index: -1; /* Всегда под всеми слоями */
  transition: background-image 1s ease-in-out;
}
</style>


