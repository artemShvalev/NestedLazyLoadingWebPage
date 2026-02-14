<template>
  <!-- Боковое меню для мобилок -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    theme="dark"
    class="pa-4"
  >
    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :title="item.title"
        :prepend-icon="item.icon"
        @click="drawer = false"
        color="secondary"
        rounded="lg"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Основная шапка -->
  <v-app-bar flat border="b" class="px-md-10" color="surface">
    
    <!-- Группа Логотип + Текст (клик по всей области ведет на главную) -->
    <div 
      class="d-flex align-center cursor-pointer mr-4" 
      @click="$router.push('/')"
    >
      <v-img 
        src="/img/main.png"
        width="40"
        height="40"
        class="mr-3 transition-swing"
        :class="{ 'spinning': isGlobalPlaying }"
        contain
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="secondary" size="20"></v-progress-circular>
          </div>
        </template>
      </v-img>

      <div 
        :class="$vuetify.display.xs ? 'd-none' : 'd-flex'"
        class="font-weight-black text-uppercase text-h6"
      >
        Nested <span class="text-secondary ml-1">Lazy</span><span class="ml-1">Loading</span>
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- Кнопки для ПК с новым стилем подчеркивания -->
    <div class="d-none d-md-flex align-center">
      <v-btn
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        variant="text"
        class="mx-1 nav-btn"
        rounded="lg"
      >
        {{ item.title }}
        <!-- Та самая анимированная линия -->
        <div class="nav-line"></div>
      </v-btn>
    </div>

    <!-- Бургер для мобилок -->
    <v-btn
      icon="mdi-menu"
      class="d-md-none"
      @click="drawer = !drawer"
    ></v-btn>
  </v-app-bar>
</template>

<style scoped>
/* Стили для кнопок навигации */
.nav-btn {
  position: relative;
  text-transform: none !important;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

/* Скрытая линия под кнопкой */
.nav-line {
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 0;
  height: 2px;
  background: rgb(var(--v-theme-secondary));
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

/* Анимация при наведении и для активной кнопки */
.nav-btn:hover .nav-line,
.v-btn--active .nav-line {
  width: 20px;
}

.nav-btn:hover {
  color: rgb(var(--v-theme-secondary)) !important;
}

.cursor-pointer {
  cursor: pointer;
}

/* Анимация вращения логотипа */
.spinning {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>


<script setup>
import { ref } from 'vue'
import { inject } from 'vue'



const isGlobalPlaying = inject('isGlobalPlaying')

const drawer = ref(false)

const menuItems = [
  { title: 'Главная', path: '/', icon: 'mdi-home' },
  { title: 'Последний релиз', path: '/about', icon: 'mdi-information' },
  { title: 'Написать', path: '/contact', icon: 'mdi-email' },
]
</script>
<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinning {
  animation: spin 8s linear infinite;
}

.cursor-pointer {
  cursor: pointer;
}

.v-img{
  border-radius: 50%;
}
</style>
