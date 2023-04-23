<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import NavBar from './components/NavBar.vue';
import CompanyList from './components/CompanyList.vue'
import FilterInput from './components/FilterInput.vue'
import CompanyItem from './components/CompanyItem.vue'
import LoadingUI from './components/UI/LoadingUI.vue';
import ErrorUI from './components/UI/ErrorUI.vue'
const authStore = useAuthStore();
const { isLoading, isLoggedIn } = storeToRefs(authStore);
const { init } = authStore;
onMounted(() => {
  init()
})
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 offset-md-2">
        <LoadingUI v-if="isLoading" />
        <div v-else-if="!isLoading && isLoggedIn" class="card">
          <FilterInput />
          <div class="card-body">
            <CompanyList />
          </div>
        </div>
        <ErrorUI v-else />
      </div>
    </div>
  </div>
  <CompanyItem />
</template>

<style scoped></style>
