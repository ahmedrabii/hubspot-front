import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import type Page from '@/models/page.model'
import type Company from '@/models/company.model'

export const useCompanyStore = defineStore('company', () => {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  const industries = ref<string[]>([])
  const selectedIndustry = ref<string>('')

  const pages = ref<Page[]>([])
  const selectedPage = ref<Page>({ id: 1, selected: true })

  const companies = ref<Company[]>([])
  const selectedCompany = ref<Company>()

  const showSelectedCompany = ref(false)

  const isLoading = ref(false)
  const hasErrors = ref(false)

  const isLoadingItem = ref(false)
  const hasErrorsItem = ref(false)

  const isLoadingFilter = ref(false)

  async function applyIndusFilter(indus: string) {
    isLoadingFilter.value = true
    selectedIndustry.value = indus
    await init()
    isLoadingFilter.value = false
  }

  async function selectCompany(company: Company) {
    isLoadingItem.value = true
    hasErrorsItem.value = false
    showSelectedCompany.value = true
    const res = await fetchItem(company)
    if (res === false) {
      hasErrorsItem.value = true
    } else {
      const companyObject: Company = res.data
      if (companyObject.contacts?.length) {
        const contact = companyObject.contacts[0]
        companyObject.email = contact.email
      }
      selectedCompany.value = companyObject
    }
    isLoadingItem.value = false
  }
  function toggleShowSelectedCompany() {
    showSelectedCompany.value = !showSelectedCompany.value
  }

  async function selectPage(page: Page) {
    const oldPage = selectedPage.value
    pages.value = pages.value.map((element) => {
      element.selected = element.id === page.id
      if (element.selected) {
        selectedPage.value = element
      }
      return element
    })
    if (oldPage.id !== selectedPage.value.id) {
      await init()
    }
  }

  async function init() {
    isLoading.value = true
    hasErrors.value = false
    const res = await fetchList()
    const resIndus = await fetchIndustry()
    if (res === false || resIndus === false) {
      isLoading.value = false
      hasErrors.value = true
    } else {
      hasErrors.value = false
      companies.value = res.data['hydra:member']
      industries.value = resIndus.data['hydra:member']
      const totalPages = Math.ceil(
        res.data['hydra:totalItems'] / import.meta.env.VITE_API_ITEMS_PER_PAGE
      )
      pages.value = []
      const dataPages = []
      for (let i = 1; i <= totalPages; i++) {
        dataPages.push({ id: i, selected: selectedPage.value.id === i })
      }
      pages.value = dataPages
    }
    isLoading.value = false
  }

  async function fetchItem(company: Company) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}companies/${company.id}`, {
        headers: { Authorization: token.value }
      })
      if (res.status === 200) {
        return res
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function fetchIndustry() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}companies/industry`, {
        headers: { Authorization: token.value }
      })
      if (res.status === 200) {
        return res
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function fetchList() {
    try {
      let indusFilter = ''
      if (selectedIndustry.value) {
        indusFilter = `&industry=${selectedIndustry.value}`
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}companies?page=${selectedPage.value.id}${indusFilter}`,
        {
          headers: { Authorization: token.value }
        }
      )
      if (res.status === 200) {
        return res
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return {
    companies,
    selectedCompany,
    pages,
    selectPage,
    init,
    selectCompany,
    showSelectedCompany,
    toggleShowSelectedCompany,
    isLoading,
    hasErrors,
    isLoadingItem,
    hasErrorsItem,
    industries,
    applyIndusFilter,
    isLoadingFilter
  }
})
