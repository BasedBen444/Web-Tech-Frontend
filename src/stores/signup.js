// stores/signup.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSignupStore = defineStore('signup', () => {
  const form = ref({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    position: '',
    job: '',
    password: ''
  })

  function setForm(newForm) {
    form.value = { ...newForm }
  }

  function resetForm() {
    form.value = {
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
      position: '',
      job: '',
      password: ''
    }
  }

  return { form, setForm, resetForm }
})
