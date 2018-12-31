<template>
  <section :class="{ 'text-field-content': true, disabled, round }">
    <div class="input-container">
      <div class="prefix"><slot name="prefix"></slot></div>
      <input :value="value"
             :disabled="disabled"
             :placeholder="placeholder"
             :readonly="readonly"
             ref="input"
             :class="{ right, disabled, round }"
             :type="type"
             :pattern="pattern"
             :maxlength="maxlength"
             @focus="_handleOnFocus"
             @blur="_handleOnBlur"
             @input="_handleInput"
             @keydown="_handleKeyDown"
      />&nbsp;
      <div class="postfix"><slot name="postfix"></slot></div>
      <div :class="{ 'bottom-line': true, active: focused, round }"></div>
    </div>
    <div :class="{ message: true, error: state === 'error', info: state === 'info', warning: state === 'warning' }">{{message}}</div>
  </section>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      text: this.value,
      focused: false
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: 'error'
    },
    type: {
      type: String,
      default: 'text'
    },
    maxlength: {
      type: String,
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    right: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    _handleInput (e) {
      const maxLenght = +this.maxlength
      if (this.maxlength && !isNaN(maxLenght) && e.target.value.length > maxLenght) {
        e.target.value = e.target.value.substring(0, maxLenght)
      }
      this.$emit('input', e.target.value)
    },
    _handleOnFocus () {
      if (this.readonly || this.disabled) {
        return false
      }
      this.focused = true
      this.$nextTick(() => {
        this.$refs.input.selectionEnd = this.$refs.input.selectionStart = this.value.length
      })
      this.$emit('focus', this.focused)
    },
    _handleOnBlur () {
      this.focused = false
      this.$emit('blur', this.focused)
    },
    _handleKeyDown (e) {
      if (e.keyCode !== 13) {
        return false
      }
      const ary = [ ...document.querySelectorAll('input:not(.disabled):not([type="checkbox"]):not([type="hidden"])') ]
      const index = ary.findIndex(v => v === e.target)
      if (index < 0) {
        return false
      }
      let pos = index
      let nextEl = null
      while (ary.length > pos && pos < 1000) {
        nextEl = ary[pos + 1]
        if (nextEl) {
          break
        }
        pos += 1
      }
      if (nextEl) {
        nextEl.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-field-content {
  display: inline-block;
  align-items: center;
  position: relative;
  border-bottom: solid 1px #999;
  width: 100%;
  height: 100%;
  &.round {
    // background-color: #FAFAFA;
    border: solid 1px #2f3640;
    border-radius: 22px;
  }
  &.disabled {
    border-bottom: dotted 1px #999;
    color: #9E9E9E;
    &.round {
      border: dotted 1px #999;
    }
  }
  .input-container {
    display: flex;
    flex: 1 1 0;
    position: relative;
    height: 100%;

    input {
      font-family: inherit;
      font-size: 16px;
      width: 100%;
      outline: none;
      border: 0;
      padding: 4px;
      vertical-align: middle;
      transform-origin: top left;
      background-color: transparent;
      // transform: scale(0.75);    //  12px / 16px
      &:focus {
        font-size: 16px;
      }
      &.right {
        text-align: right;
      }
      &.round {
        // background-color: #FAFAFA;
        border-radius: 22px;
      }
      &.disabled {
        // background-color: #FFF;
        &.round {
          background-color: transparent;
        }
      }
      &::placeholder {
        font-size: 13px;
        color: #CCC;
      }
    }
  }
  .bottom-line {
    position: absolute;
    bottom: -1px;
    height: 2px;
    width: 0;
    left: 0;
    background-color: #2f3640;
    transition: .2s width ease-in-out;
  }
  .bottom-line.active:not(.round) {
    width: 100%;
    background-color: #2f3640;
    transition: .2s width ease-in-out;
  }
  .message {
    font-size: 12px;
    position: absolute;
    line-height: 21px;
    overflow: visible;
    &.error {
      color: red;
    }
    &.info {
      color: #666;
    }
    &.warning {
      color: #FFC107;
    } 
  }
}
/* disable auto-zoom on iphone input field focus */
@media screen and (-webkit-min-device-pixel-ratio:0) {
	select:focus,
	textarea:focus,
	input:focus {
		font-size: 16px;
	}
}
</style>
