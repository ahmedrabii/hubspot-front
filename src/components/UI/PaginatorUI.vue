<script setup lang="ts">
defineProps(['pages'])

const emit = defineEmits(['selectPage'])

function selectPage(page: { id: number }) {
  emit('selectPage', page)
}
</script>

<template>
  <nav
    class="justify-content-center overflow-auto"
    v-if="pages && pages.length > 1"
    aria-label="Page navigation"
  >
    <ul class="pagination pagination-sm">
      <li
        v-for="(page, index) in pages"
        class="page-item"
        :class="{ active: page.selected }"
        :key="page.id"
      >
        <a class="page-link" @click.prevent="selectPage(page)" :href="'#' + page.id">{{
          index + 1
        }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
