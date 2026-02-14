import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css' 
import router from './router'
import fadeIn from './directives/fadeIn'
import AppHeader from "././components/layout/AppHeader.vue"
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
    icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
app.directive('fade-in', fadeIn)
app.component('AppHeader', AppHeader)
