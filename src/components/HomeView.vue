<template>
  <v-sheet height="100vh" class="position-relative overflow-hidden" style="margin-top: -64px;">
    
    <v-carousel
      v-model="activeSlide"
      cycle
      height="100vh"
      hide-delimiter-background
      :show-arrows="false"
      interval="6000"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="slide.title"
        :src="slide.src"
        cover
        eager
      >
        <!-- Заменяем v-overlay на обычный flex-div. Это даст полный контроль над размерами -->
        <div 
          class="d-flex fill-height align-center justify-center text-center" 
          style="background: rgba(0,0,0,0.5);"
        >
          <v-container class="px-6">
            <v-slide-y-transition grow>
              <div v-if="activeSlide === i">
                <!-- Адаптивный шрифт: text-h4 для мобил, text-md-h1 для ПК -->
                <h1 
                  :class="$vuetify.display.xs ? 'text-h4' : 'text-h1'" 
                  class="font-weight-black text-white mb-3 tracking-tighter"
                >
                  {{ slide.title }}
                </h1>
                
                <!-- Адаптивный подзаголовок -->
                <p 
                  :class="$vuetify.display.xs ? 'text-body-1' : 'text-h5'" 
                  class="text-grey-lighten-2 mb-8 mb-md-10 font-italic"
                >
                  {{ slide.sub }}
                </p>
                
                <div class="d-flex justify-center">
                  <v-btn
                    color="secondary"
                    :size="$vuetify.display.xs ? 'large' : 'x-large'"
                    :block="$vuetify.display.xs"
                    rounded="xl"
                    to="/about" 
                    prepend-icon="mdi-play"
                    class="px-8"
                  >
                    Слушать
                  </v-btn>
                </div>
              </div>
            </v-slide-y-transition>
          </v-container>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import mainImg from "/img/main.png";
import PopArtImg from "/img/pop-art.png";

const activeSlide = ref(0)

const slides = [
  {
    src: mainImg,
    title: 'NESTED LAZY LOADING',
    sub: 'Путешествие вглубь звука',
  },
  {
    src: PopArtImg,
    title: 'NEW EP: Laзy',
    sub: '',
  }
]
</script>

<style scoped>
.tracking-tighter {
  letter-spacing: -2px !important;
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

/* Убираем стандартные кнопки слайдера, если они мешают */
:deep(.v-window__controls) {
  padding: 0 5%;
}
</style>
