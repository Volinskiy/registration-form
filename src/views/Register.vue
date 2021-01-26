<template>
  <form class="card auth-card" @submit.prevent="submitHandler()">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: isEmailInvalid}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="emailIsnotRequired"
        >Поле Email не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="emailIsnotEmail"
        >Введите корректный email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: isPasswordInvalid}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="passwordIsnotRequired"
        >Поле Пароль не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="passwordIsnotPassword"
        >Пароль не может быть меньше {{ $v.password.$params.minLength.min }} символов. Сечас он {{ password.length }}</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: isNameInvalid}"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="nameIsnotRequired"
        >Имя не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="nameIsnotName"
        >Имя не может быть меньше {{ $v.name.$params.minLength.min }} символов. Сечас он {{ name.length }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required, minLength: minLength(3) },
    agree: { checked: (v) => v },
  },
  computed: {
    isEmailInvalid() {
      return this.emailIsnotRequired || this.emailIsnotEmail;
    },
    isPasswordInvalid() {
      return this.passwordIsnotRequired || this.passwordIsnotPassword;
    },
    isNameInvalid() {
      return this.passwordIsnotRequired || this.passwordIsnotPassword;
    },
    emailIsnotRequired() {
      return this.$v.email.$dirty && !this.$v.email.required;
    },
    emailIsnotEmail() {
      return this.$v.email.$dirty && !this.$v.email.email;
    },
    passwordIsnotRequired() {
      return this.$v.password.$dirty && !this.$v.password.required;
    },
    passwordIsnotPassword() {
      return this.$v.password.$dirty && !this.$v.password.minLength;
    },
    nameIsnotRequired() {
      return this.$v.password.$dirty && !this.$v.password.required;
    },
    nameIsnotName() {
      return this.$v.name.$dirty && !this.$v.name.minLength;
    },
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      // Объект для отправки на сервер
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      console.log(formData);

      this.$router.push("/");
    },
  },
};
</script>
