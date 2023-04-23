import type Contact from './contact.model'

export default interface Company {
  id: number
  name: string
  industry: string
  city: string
  country: string
  website: string
  phone: string
  zip: string
  numberOfEmployees: number
  annualRevenue: string
  description: string
  contacts?: Contact[]
  email?: string
}
