import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: {
      elevation: 4,
      prependIcon: "$vuetify",
    },
    icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  },
})
