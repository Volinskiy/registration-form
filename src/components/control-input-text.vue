<template>
  <div class="control-input-text">
    <label class="control-input-text__label">
      <span class="control-input-text__label-text">
        {{ label }}
      </span>
      <input
        type="text"
        class="control-input-text__input"
        :placeholder="placeholder"
      >
    </label>
    <span
      :class="{ active: !valid }"
      class="control-input-text__warn-mess">
      
      {{ warningMess }}
    </span>
  </div>
</template>

<script>

export default {
  props: [
    'label', 'warning-mess', 'placeholder', 'valid',
  ]
};
  
</script>

<style lang="less">
  .control-input-text {
    @elements-margin-bottom: 8px;
    
    display: flex;
    flex-direction: column;
    line-height: 1.3em;

    & > * {
      margin-bottom: @elements-margin-bottom;
    }

    & > *:last-child {
      margin-bottom: 0;
    }

    &__label {
      display: flex;
      flex-direction: column;
      Size: 16px;
    }

    &__label-text {
      margin-bottom: @elements-margin-bottom;
      font-weight: 500;
      color: #756F86;
    }

    &__input {
      @padding-top-bottom: 16px;

      border-radius: 6px;
      padding-top: @padding-top-bottom;
      padding-bottom: @padding-top-bottom;
      padding-left: 16px;
      padding-right: 16px;
      line-height: 1.3em;
      border: 1px solid #DBE2EA;
      background: #FFFFFF;
      box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);

      &:active,
      &:focus {
        border-width: 2px;
        border-color: #0880AE;
        outline: none;
        // Учитываем изменение ширины border при фокусе/активности
        padding-top: calc(@padding-top-bottom - 1px);
        padding-bottom: calc(@padding-top-bottom - 1px);

      }
    }

    &__warn-mess {
      color: #FF7171;
      font-size: 14px;
      line-height: 1.3em;
      visibility: hidden;

      &.active {
        visibility: visible;
      }
    }
  }
</style>