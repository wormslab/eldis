<template>
  <button ref="btn"
          type="button"
          :class="{ 'button-container': true, disabled, flat, bold, outline, round, 'radius-sm': radiusSm, 'radius-md': radiusMd, 'radius-lg': radiusLg }" @click="_handleClick"
          :style="{ color }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    radiusSm: {
      type: Boolean,
      default: false
    },
    radiusMd: {
      type: Boolean,
      default: false
    },
    radiusLg: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },
  methods: {
    _handleClick (e) {
      if (this.disabled) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  height: 100%;
  width: 100%;
  background-color: #2f3640;
  color: #FFF;
  cursor: pointer;
  border: none;
  text-decoration: none;
  padding: 0;
  outline: 0;
  font-size: 1em;
  border-radius: 0.8rem;
  transition: background-color .3s;
  &.outline {
    background-color: #FFF;
    border: solid 1px #2f3640;
    color: #2f3640;
    transition: background-color .3s;
  }
  &.round {
    border-radius: 2rem;
  }
  &.bold {
    font-weight: bold;
  }
  &.flat {
    background-color: transparent;
    color: #247B9F;
    transition: background-color .3s;
  }
  &.disabled {
    background-color: #CCC;
    border: none;
    color: #FFF;
    cursor: initial;
    transition: background-color .3s;
  }
  &.radius-sm {
    border-radius: 4px;
  }
  &.radius-md {
    border-radius: 8px;
  }
  &.radius-lg {
    border-radius: 16px;
  }
}
</style>
