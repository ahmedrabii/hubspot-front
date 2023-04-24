<script setup lang="ts">
import { toRef } from 'vue'
const props = defineProps(['show'])
const show = toRef(props, 'show')
const emit = defineEmits(['close'])
const close = () => {
  emit('close', true)
}
</script>

<template>
  <div
    class="modal fade"
    :class="{ show }"
    :style="{ display: show ? 'block' : 'none' }"
    id="modal"
    tabindex="-1"
    aria-labelledby="modal"
    aria-hidden="true"
    aria-modal="true"
    role="dialog"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title">Modal title</slot>
          </h5>
          <button
            @click="close"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="default">Modal body</slot>
        </div>
        <div class="modal-footer">
          <button @click="close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade {
  transition: opacity 0.15s linear;
}

.modal.fade.show {
  background-color: #302b2b78;
}
</style>
