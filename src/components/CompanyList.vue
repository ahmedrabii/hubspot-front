<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCompanyStore } from '@/stores/company'
import CompanyListRow from './CompanyListRow.vue';
import PaginatorUI from './UI/PaginatorUI.vue';
import LoadingUI from './UI/LoadingUI.vue';
import ErrorUI from './UI/ErrorUI.vue';
const companyStore = useCompanyStore()
const { companies: rows, pages, isLoading, hasErrors } = storeToRefs(companyStore)
const { init } = companyStore
onMounted(() => {
  init()
})
</script>

<template>
  <LoadingUI v-if="isLoading" />
  <table v-else-if="!hasErrors" class="table table-striped align-middle">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Image</th>
        <th scope="col">Nom de l'entreprise</th>
        <th scope="col">Secteur d'activité</th>
        <th scope="col">Ville</th>
        <th scope="col">Pays</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <CompanyListRow @on-select="companyStore.selectCompany($event)" v-for="row in rows" :key="row.id" :row="row" />
    </tbody>
  </table>
  <div class="row">
    <div class="col-12">
      <PaginatorUI @select-page="companyStore.selectPage($event)" :pages="pages" />
    </div>
  </div>
  <ErrorUI v-if="hasErrors" />
</template>

<style scoped></style>