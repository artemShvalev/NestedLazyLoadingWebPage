<template>
  <v-container fluid class="pa-0 music-page">
    <!-- ФОН: Исправлен путь и проверка -->
    <div 
      v-if="tracks && tracks[currentTrack]"
      class="bg-blur"
      :style="{ backgroundImage: `url('${tracks[currentTrack]?.cover || currentRelease.cover}')` }"
    ></div>

    <v-container class="content-wrapper py-6 py-md-10">
      <v-row justify="center" align="center" class="flex-column">
        
        <!-- НАЗВАНИЕ АЛЬБОМА -->
        <div class="text-center mb-6">
          <p class="text-overline text-secondary mb-1 text-uppercase font-weight-bold">
            {{ currentRelease.albumTitle }}
          </p>
        </div>

        <!-- ОБЛОЖКА: Исправлено обращение tracks[currentTrack].cover -->
        <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center mb-6">
          <v-card
            elevation="24"
            class="rounded-xl overflow-hidden"
            :max-width="$vuetify.display.xs ? 260 : 400" 
          >
            <v-img 
              :src="tracks[currentTrack].cover || currentRelease.cover" 
              aspect-ratio="1" 
              cover 
              eager
            ></v-img>
          </v-card> 
        </v-col>

        <!-- ПЛЕЕР И СПИСОК -->
        <v-col cols="12" sm="10" md="8" lg="6" class="text-center text-white px-4">
          <div class="mb-6 text-center">
            <h1 :class="$vuetify.display.xs ? 'text-h4' : 'text-h2'" class="font-weight-black mb-1">
              {{ tracks[currentTrack].title }}
            </h1>
            <p class="text-body-1 font-weight-light opacity-70">
              {{ currentRelease.artist }} • {{ tracks[currentTrack].year || '2024' }}
            </p>
          </div>

          <!-- КАРТОЧКА ПЛЕЕРА -->
          <v-card variant="tonal" class="pa-4 pa-md-6 mb-8 rounded-xl bg-black-opacity">
            <v-slider
              v-model="seekValue"
              color="secondary"
              @update:model-value="seekAudio"
              hide-details
              class="mb-1"
            ></v-slider>
            <div class="d-flex justify-space-between text-caption mb-4 px-1">
              <span>{{ currentTimeFormatted }}</span>
              <span>{{ tracks[currentTrack].duration }}</span>
            </div>
            
            <div class="d-flex align-center justify-center">
              <v-btn icon="mdi-skip-previous" variant="text" @click="prevTrack"></v-btn>
              <v-btn
                :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
                :size="$vuetify.display.xs ? 'large' : 'x-large'"
                color="secondary"
                elevation="8"
                class="mx-4 mx-md-8"
                @click="togglePlay"
              ></v-btn>
              <v-btn icon="mdi-skip-next" variant="text" @click="nextTrack"></v-btn>
            </div>
          </v-card>

          <!-- СПИСОК ТРЕКОВ СО СКРОЛЛОМ -->
          <v-card variant="outlined" class="rounded-xl border-opacity-25 overflow-hidden bg-black-opacity">
             <v-card-title class="text-subtitle-2 font-weight-bold text-left py-3 px-6 bg-grey-darken-4">
               TRACKLIST ({{ tracks.length }})
             </v-card-title>
             <v-list 
               bg-color="transparent" 
               class="text-left overflow-y-auto" 
               style="max-height: 350px; scrollbar-width: thin;"
             >
               <v-list-item
                 v-for="(track, i) in tracks"
                 :key="i"
                 :active="currentTrack === i"
                 color="secondary"
                 rounded="lg"
                 class="mx-2 mb-1 px-4"
                 @click="selectTrack(i)"
               >
                 <template v-slot:prepend>
                   <v-icon v-if="currentTrack === i && isPlaying" size="small" color="secondary" class="mr-2">mdi-waveform</v-icon>
                   <span v-else class="text-caption mr-4 opacity-50">{{ i + 1 }}</span>
                 </template>
                 <v-list-item-title :class="currentTrack === i ? 'text-secondary font-weight-bold' : ''">
                   {{ track.title }}
                 </v-list-item-title>
                 <template v-slot:append>
                   <span class="text-caption opacity-50">{{ track.duration }}</span>
                 </template>
               </v-list-item>
             </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <audio
      ref="audioPlayer"
      :src="tracks[currentTrack].url"
      @timeupdate="onTimeUpdate"
      @ended="nextTrack"
    ></audio>
  </v-container>
</template>


<script setup>
import { ref, computed } from 'vue'
import { currentRelease } from '../data/playlist'
import { inject } from 'vue'

const isGlobalPlaying = inject('isGlobalPlaying')
const audioPlayer = ref(null)
const isPlaying = ref(false)
const currentTrack = ref(0)
const seekValue = ref(0)
const currentTime = ref(0)
const tracks = currentRelease.tracks
// Форматирование времени (0:00)
const currentTimeFormatted = computed(() => {
  const min = Math.floor(currentTime.value / 60)
  const sec = Math.floor(currentTime.value % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
})

const togglePlay = () => {
  isPlaying.value ? audioPlayer.value.pause() : audioPlayer.value.play()
  isPlaying.value = !isPlaying.value
  isGlobalPlaying.value = isPlaying.value
}

const selectTrack = (i) => {
  currentTrack.value = i
  isPlaying.value = true
  setTimeout(() => {
    if (audioPlayer.value) audioPlayer.value.play().catch(e => {
      alert('Ошибка при запуске файла', e)
    })
  }, 0)
}

const onTimeUpdate = () => {
  const audio = audioPlayer.value
  if (!audio || !isFinite(audio.duration)) return // Выходим, если данных нет

  currentTime.value = audio.currentTime
  seekValue.value = (audio.currentTime / audio.duration) * 100
}

const seekAudio = () => {
  const audio = audioPlayer.value
  // Проверяем, что длительность файла уже известна и она больше нуля
  if (audio && isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (seekValue.value / 100) * audio.duration
  }
}

const nextTrack = () => selectTrack((currentTrack.value + 1) % tracks.length)
const prevTrack = () => selectTrack((currentTrack.value - 1 + tracks.length) % tracks.length)
</script>

<style scoped>
.music-page {
  position: relative;
  min-height: calc(100vh - 64px);
}

.bg-blur {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  /* Возвращаем магию: размытие и приглушение яркости */
    filter: blur(50px) brightness(0.4); 
  transform: scale(1.1); /* Чтобы не было белых полос по краям из-за блюра */
  z-index: -1;
  transition: background-image 0.8s ease-in-out;
}

.content-wrapper {
  position: relative;
  z-index: 1; /* ГАРАНТИРОВАННО СПЕРЕДИ */
  background: transparent !important; /* Убираем фон контейнера, если он есть */
}


.bg-black-opacity {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(var(--v-theme-secondary), 0.3) !important;
}

/* Стилизация скроллбара для списка */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-secondary), 0.5);
  border-radius: 10px;
}
</style>