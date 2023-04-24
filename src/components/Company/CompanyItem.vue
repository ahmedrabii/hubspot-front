<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/stores/company'
import ModalUi from '../UI/ModalUI.vue'
import LoadingUI from '../UI/LoadingUI.vue'
import ErrorUI from '../UI/ErrorUI.vue'
const companyStore = useCompanyStore()
const { showSelectedCompany, selectedCompany, isLoadingItem, hasErrorsItem } =
  storeToRefs(companyStore)
const { toggleShowSelectedCompany } = companyStore
</script>

<template>
  <ModalUi class="modal-lg" :show="showSelectedCompany" @close="toggleShowSelectedCompany()">
    <template #title>{{ selectedCompany ? selectedCompany.name : '' }}</template>
    <template #default>
      <div v-if="selectedCompany && !isLoadingItem" class="container-fluid">
        <div class="row">
          <div class="col-3">
            <img
              src="public/assets/150x150.png"
              class="rounded float-start"
              :alt="selectedCompany.name"
            />
          </div>
          <div class="col-6">
            <div>
              <h5>{{ selectedCompany.name }}</h5>
            </div>
            <div>{{ selectedCompany.website }}</div>
            <div>{{ selectedCompany.phone }}</div>
            <div>
              <a
                class="m-3 p-2"
                v-if="selectedCompany.email"
                :href="'mailto:' + selectedCompany.email"
              >
                <span class="badge rounded-pill text-bg-info">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </a>
              <a
                class="m-3 p-2"
                v-if="selectedCompany.phone"
                :href="'tel:' + selectedCompany.phone"
              >
                <span class="badge rounded-pill text-bg-warning">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="col-3">
            <div>{{ selectedCompany.city }}</div>
            <div>{{ selectedCompany.zip }}</div>
            <div>{{ selectedCompany.country }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div>{{ selectedCompany.industry }}</div>
          </div>
          <div class="col-4">
            <div>{{ selectedCompany.numberOfEmployees }}</div>
          </div>
          <div class="col-4">
            <div>{{ selectedCompany.annualRevenue }}</div>
          </div>
        </div>
        <div class="row">
          <p>{{ selectedCompany.description }}</p>
        </div>
        <div v-if="selectedCompany.contacts?.length" class="row">
          <table class="table table-striped align-middle">
            <tbody>
              <tr v-for="contact in selectedCompany.contacts" :key="contact.id">
                <td>
                  <div class="row">
                    <div class="col-3">
                      <img
                        style="width: 50px"
                        src="public/assets/50x50.png"
                        class="rounded float-start"
                        :alt="contact.firstName"
                      />
                    </div>
                    <div class="col-6">
                      <div>{{ contact.firstName }}</div>
                      <div>
                        <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
                      </div>
                    </div>
                    <div class="col-3">
                      <div>{{ contact.lastName }}</div>
                      <div>
                        <a :href="'tel:' + contact.phone">{{ contact.phone }}</a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="isLoadingItem" class="container-fluid">
        <LoadingUI />
      </div>
      <div v-else-if="hasErrorsItem" class="container-fluid">
        <ErrorUI />
      </div>
    </template>
  </ModalUi>
</template>

<style scoped></style>
