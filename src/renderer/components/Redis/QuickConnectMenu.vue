<template>
  <section class="quick-connect-menu-content">
    <div class="add-connect">
      <v-button class="btn" outline @click="handleClickAddQuickConnect"><i class="fa fa-plus"></i><span>add</span></v-button>
    </div>
    <transition name="slide-up">
      <div class="remove-connect" v-if="current">
        <v-button class="btn" outline @click="handleClickRemoveQuickConnect"><i class="fa fa-trash-alt"></i><span>remove</span></v-button>
      </div>
    </transition>
    
  </section>
</template>

<script>
import VButton from '../Common/VButton'
export default {
  props: {
    current: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleClickAddQuickConnect () {
      this.$emit('add-connect')
    },
    handleClickRemoveQuickConnect () {
      this.$emit('remove-connect')
    }
  },
  components: {
    VButton
  }
}
</script>

<style lang="scss" scoped>
.quick-connect-menu-content {
  > div {
    display: inline-block;
    width: 90px;
    .btn {
      height: 25px;
      span {
        margin-left: 7px;
        text-transform: uppercase;
      }
    }
  }
  .add-connect {
    width: 90px;
  }
  .remove-connect {
    width: 120px;
  }
}
.slide-up-enter {
  opacity: 0;
}

.slide-up-leave-active {
  opacity: 0;
}

.slide-up-enter .slide-up-container,
.slide-up-leave-active .slide-up-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
