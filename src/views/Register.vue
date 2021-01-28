<template>
  <form action="" class="form-reg">
    <h1 class="form-reg__header">Регистрация</h1>
    <p class="form-reg__description">
      Уже есть аккаунт?
      <router-link
        to="/login"
        class="form-reg__link-login">
        
        Войти
      </router-link>
    </p>

    <ControlInpuTtext v-for="input in inputs"
      :label="input.label"
      :warning-mess="input.warningMess"
      :placeholder="input.placeholder"
      :valid="input.valid"
      :key="input.id"
      class="form-reg__control-input-text"
    />
  </form>
</template>

<style lang="less">
  .form-reg {
    width: 460px;
    padding: 40px 30px;
    background: #FFFFFF;
    box-shadow: 0px 12px 24px rgba(44, 39, 56, 0.02), 0px 32px 64px rgba(44, 39, 56, 0.04);
    border-radius: 24px;

    & > * {
      margin-bottom: 8px;

      &:nth-child(2) {
        margin-bottom: 58px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  
    &__header {
      margin-bottom: 8px;
      font-size: 34px;
      line-height: 1.3em;

    }

    &__description {
      line-height: 1.3em;
    }

    &__link-login {
      @color: #0880AE; 
      
      color: @color;
      outline-color: @color;
    }

    &__control-input-text {

    }

  }

</style>

<script>
  import ControlInpuTtext from '@/components/control-input-text.vue'

  export default {
    
    data() {
      return {
        inputs: [
          {
            label: 'Имя',
            warningMess: 'Имя введено неверное',
            placeholder: 'Введите ваше имя',
            valid: false,
            id: 1,
          },
          {
            label: 'Email',
            warningMess: 'Email введен неверное',
            placeholder: 'Введите ваш email',
            valid: true,
            id: 2,
          },
          {
            label: 'Номер телефона',
            warningMess: 'Номер телефона введена неверное',
            placeholder: 'Введите номер телефона',
            valid: true,
            id: 3,
          },
        ]
      }
    },
    components: {
      ControlInpuTtext
    },
  }

</script>
