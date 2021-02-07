<template>
  <form action="" class="form-reg">
    <h1 class="form-reg__header">Регистрация</h1>
    <p class="form-reg__description">
      Уже есть аккаунт?
      <router-link
        to="/login"
        class="link">
        Войти
      </router-link>
    </p>

    <ControlInputText v-for="input in inputs"
      :label="input.label"
      :warning-mess="input.warningMess"
      :placeholder="input.placeholder"
      :valid="input.valid"
      :key="input.id"
      class="form-reg__control-input-text"
    />

    <ControlInputText
      :label="selectLanguage.label"
      :warning-mess="selectLanguage.warningMess"
      :placeholder="selectLanguage.placeholder"
      :valid="selectLanguage.valid"
      :has-dropdown="true"
      :dropdown-list="langList"
    />
    
    <label class="checkbox form-reg__checkbox" >
      <input type="checkbox" tabindex="0">
      <span class="checkbox__box"></span>
      <p>
        Принимаю <a class="link" href="#" target="blank">условия</a>  использования
      </p>
    </label>

    <button class="form-reg__button-submit" type="submit">Зарегистрироваться</button>

  </form>

</template>


<script>
  import ControlInputText from '@/components/control-input-text.vue'
  // import ControlSelect from '@/components/control-select.vue'

  export default {
    
    data() {
      return {
        inputs: [
          {
            label: 'Имя',
            warningMess: 'Имя введено неверное',
            placeholder: 'Введите Ваше имя',
            valid: false,
            id: 1,
          },
          {
            label: 'Email',
            warningMess: 'Email введен неверное',
            placeholder: 'Введите Ваш email',
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
        ],
        selectLanguage: {
          label: 'Язык',
          placeholder: 'Выберите язык',
          warningMess: 'Язык не выбран',
          valid: true,
        },
        langList: null,
      }
    },
    components: {
      ControlInputText,
      // ControlSelect,
    },
    created: function() {
      this.langList = this.$store.state.langList
    }
  }

</script>

<style lang="less">
  @import '../assets/variables.less';
  @import '../assets/blocks/checkbox.less';

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
      margin-bottom: 10px;
      font-size: 34px;
      line-height: 1.3em;
      color: @text-gray;
    }

    &__description {
      line-height: 1.3em;
      color: #2C2738;
    }

    &__button-submit {
      --border-color: @controls-active-color;
      --background-color: @controls-active-color;
      --color: #EBF4F8;
      --box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08), 0px 4px 8px rgba(44, 39, 56, 0.08);

      display: block;
      width: 100%;
      padding: 16px 0 16px 0;
      margin-top: 36px;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: var(--color);
      background-color: var(--background-color);
      box-shadow: var(--box-shadow);
      border-width: 2px;
      border-style:  solid;
      border-color: var(--border-color);
      border-radius: @controls-border-radius;
      outline: 0;


      &:focus,
      &:active,
      &:hover {
        --border-color:rgba(44, 39, 56, 0.86);
        --box-shadow: 0px 12px 24px rgba(44, 39, 56, 0.08), 0px 24px 48px rgba(44, 39, 56, 0.16);
      }

      &:disabled {
        --color: #B1B5BF;
        --background-color: #DBE2EA;
        --border-color: #DBE2EA;
      }
    }

  }

</style>