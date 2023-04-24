<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCompanyStore } from '@/stores/company'
import LoadingUI from '../UI/LoadingUI.vue';
import ErrorUI from '../UI/ErrorUI.vue';
import { ref } from 'vue';
const companyStore = useCompanyStore()
const { industries, isLoading, hasErrors, isLoadingFilter } = storeToRefs(companyStore)
const { applyIndusFilter } = companyStore
const selected = ref('')
function onSectorChange() {
  applyIndusFilter(selected.value);
  console.log("Called>>>>", selected.value);
}
</script>

<template>
  <div v-if="(!isLoading || isLoadingFilter) && !hasErrors && industries.length" class="mb-3 row p-3">
    <label for="sector" class="col-3 form-label">Secteur d'activité :</label>
    <div class="col-3">
      <select v-model="selected" @change="onSectorChange()" id="sector" class="form-select form-select-sm"
        aria-label="Secteur d'activité">
        <option selected value="">Secteur d'activité</option>
        <option v-for="industry in industries" :key="industry" :value="industry">{{ industry }}</option>
      </select>
    </div>
  </div>
  <LoadingUI v-else-if="isLoading && !isLoadingFilter" />
  <ErrorUI v-else-if="hasErrors" />
</template>

<style scoped></style>
