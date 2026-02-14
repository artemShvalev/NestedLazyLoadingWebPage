<template>
  <!-- Изменил класс на contact-page-wrapper, чтобы он совпадал со стилями -->
  <v-container fluid class="pa-0 contact-page-wrapper">
    <div class="content-overlay px-4">
      <v-row no-gutters justify="center" align="center" style="min-height: 90vh;">
        <v-col cols="11" sm="8" md="6" lg="4" xl="3">
          
          <v-fade-transition appear>
            <v-card class="glass-card pa-8 rounded-xl" theme="dark">
              <v-card-item class="text-center mb-6">
                <v-icon icon="mdi-email-fast-outline" size="x-large" color="secondary" class="mb-4"></v-icon>
                <v-card-title class="text-h4 font-weight-black">Написать</v-card-title>
              </v-card-item>

              <v-form v-model="isFormValid" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.user_name"
                      :rules="nameRules"
                      label="Ваше имя"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      rounded="lg"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.user_email"
                      :rules="emailRules"
                      label="Email"
                      variant="outlined"
                      prepend-inner-icon="mdi-at"
                      rounded="lg"
                      color="secondary"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.message"
                      :rules="messageRules"
                      label="Сообщение"
                      variant="outlined"
                      prepend-inner-icon="mdi-message-text"
                      rounded="lg"
                      color="secondary"
                      rows="4"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-btn
                  :disabled="!isFormValid"
                  type="submit"
                  block
                  size="x-large"
                  color="secondary"
                  rounded="xl"
                  class="mt-4 font-weight-bold"
                  :loading="loading"
                  elevation="8"
                >
                  ОТПРАВИТЬ
                </v-btn>
              </v-form>

              <v-divider class="my-8 opacity-20"></v-divider>

              <div class="text-center">
                <p class="text-caption text-grey mb-2">Direct Mail</p>
                <a href="mailto:artcom888@mail.ru" class="text-h6 text-white text-decoration-none hover-link">
                  artcom888@mail.ru
                </a>
              </div>
            </v-card>
          </v-fade-transition>
          
        </v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar" :color="snackColor" timeout="3000" rounded="pill">
      <div class="text-center font-weight-bold">{{ snackText }}</div>
      <template v-slot:actions>
        <v-btn variant="text" icon="mdi-close" @click="snackbar = false"></v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import emailJS from "@emailjs/browser";
// Валидация
const nameRules = [
  v => !!v || 'Введите ваше имя',
  v => (v && v.length >= 2) || 'Имя должно быть не короче 2 символов',
]

const emailRules = [
  v => !!v || 'Email обязателен',
  v => /.+@.+\..+/.test(v) || 'Введите корректный Email',
]

const messageRules = [
  v => !!v || 'Напишите хотя бы пару слов',
  v => (v && v.length >= 10) || 'Сообщение слишком короткое (минимум 10 символов)',
]

// Состояние валидности всей формы
const isFormValid = ref(false)


const snackbar = ref(false)
const snackText = ref('')
const snackColor = ref('success') 

const loading = ref(false)

const formData = ref({
  user_name: "",
  user_email: "",
  message: ""
})

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const submitForm = async () => {
  // 1. Проверяем в консоли, подцепились ли переменные
  console.log("Проверка ключей из .env:", {
    service: SERVICE_ID,
    template: TEMPLATE_ID,
    public: PUBLIC_KEY
  });

  loading.value = true

  try {
    await emailJS.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.value.user_name,
        reply_to: formData.value.user_email,
        user_email: formData.value.user_email,
        message: formData.value.message,
      },
      PUBLIC_KEY
    )
    
    snackText.value = 'Письмо успешно отправлено! 🚀'
    snackColor.value = 'success'
    snackbar.value = true


    formData.value = { user_name: '', user_email: '', message: '' }
  } catch (error) {

    snackText.value = 'Ошибка при отправке. Попробуй позже.'
    snackColor.value = 'error'
    snackbar.value = true
  } finally {
    loading.value = false
  }
}



const lazyLoading = () => {
  loading.value = true
  // Имитация отправки
  setTimeout(() => {
    loading.value = false
    alert('Сообщение отправлено! Мы свяжемся с вами.')
  }, 2000)
}
</script>

<style scoped>
.contact-page-wrapper {
  /* Важно: используем vh, но убираем скролл у родителя */
  height: calc(100vh - 64px); 
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
              url('/img/freepik__nested-lazy-loading__78315.png');
  background-size: cover;
  background-position: center;
  overflow: hidden !important; /* ЗАПРЕЩАЕМ СКРОЛЛ ВСЕЙ СТРАНИЦЫ */
}

.fill-height {
  /* Вычитаем высоту футера из внутреннего пространства */
  height: calc(100vh - 64px - 40px) !important; 
}

.glass-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* Если форма не влезает (например, на iPhone 5), скроллиться будет только КАРТОЧКА */
  max-height: 80vh; 
  overflow-y: auto;
}
</style>



