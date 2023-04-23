import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const isLoggedIn = ref(false)
  const token = ref('')

  async function login() {
    try {
      isLoading.value = true
      const res = await axios.post(import.meta.env.VITE_API_BASE_URL + 'login_check', {
        username: import.meta.env.VITE_API_USERNAME,
        password: import.meta.env.VITE_API_PASSOWR
      })
      if (res.status === 200) {
        token.value = 'Bearer ' + res.data.token
        isLoggedIn.value = true
      } else {
        token.value = ''
        isLoggedIn.value = false
      }
      isLoading.value = false
    } catch (error) {
      console.log(error)

      token.value = ''
      isLoggedIn.value = false
      isLoading.value = false
    }
  }
  async function init() {
    await login()
  }
  return { token, isLoading, login, init, isLoggedIn }
})
