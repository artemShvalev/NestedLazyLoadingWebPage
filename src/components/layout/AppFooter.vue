<template>
    <!-- class="pa-0" убирает все отступы, min-height ограничивает высоту -->
  <v-footer 
    app 
    class="bg-grey-darken-4 px-4 py-1 d-flex align-center justify-center"
    style="min-height: 40px !important; height: 40px;"
  >
    <v-container fluid class="pa-0 d-flex align-center justify-space-between">
      
      <!-- Левая часть: Копирайт (скрываем на мобилках для чистоты) -->
      <div v-if="!$vuetify.display.xs" class="text-caption text-grey-lighten-1 font-weight-light">
        © {{ new Date().getFullYear() }}
      </div>

      <v-spacer v-if="!$vuetify.display.xs"></v-spacer>

      <!-- Центральная/Правая часть: Соцсети -->
      <div class="d-flex align-center mx-auto mx-md-0">
        <v-btn
          v-for="network in socialNetworks"
          :key="network.icon"
          :icon="network.icon"
          :color="network.color"
          :href="network.link"
          target="_blank"
          variant="text"
          density="comfortable" 
          size="small"
          class="mx-1"
        ></v-btn>
      </div>

    </v-container>
  </v-footer>
</template>

<style scoped>
.hover-scale {
  transition: transform 0.3s ease;
}
@media (min-width: 960px) {
  .hover-scale:hover {
    transform: translateY(-5px) scale(1.2);
  }
}
</style>

<script setup>
const socialNetworks = [
  { icon: 'mdi-music-circle', color: 'orange', link: 'https://music.yandex.ru/artist/20629416', label: 'Yandex Music' },
  { icon: 'mdi-spotify', color: '#1DB954', link: 'https://open.spotify.com/artist/01VzS8KmoEUxdfy5WsWGlT' },
  { icon: 'mdi-youtube', color: '#FF0000', link: 'https://www.youtube.com/@NestedLazyLoading' },
  { icon: 'mdi-cloud-upload', color: '#FF5500', link: 'https://soundcloud.com/nestedlazy', label: 'Soundcloud' },
  { icon: 'mdi-send', color: '#26A5E4', link: 'https://t.me/nlloading', label: 'Telegram' }
]
</script>

<style scoped>
.hover-scale {
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-5px) scale(1.2);
}
</style>
