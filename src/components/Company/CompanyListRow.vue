<script setup lang="ts">
const props = defineProps(['row'])
const emit = defineEmits(['onSelect'])
function onSelect() {
  emit('onSelect', props.row)
}
</script>

<template>
  <tr @click="onSelect()">
    <th scope="row">{{ row.id }}</th>
    <td><img :src="'public/assets/150x150.png'" class="rounded float-start" :alt="row.id" /></td>
    <td>{{ row.name }}</td>
    <td>{{ row.industry }}</td>
    <td>{{ row.city }}</td>
    <td>{{ row.country }}</td>
    <td><button type="button" class="btn btn-primary">Voir la fiche</button></td>
  </tr>
</template>

<style scoped></style>
