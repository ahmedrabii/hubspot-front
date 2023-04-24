import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ErrorUI from '../UI/ErrorUI.vue'

describe('ErrorUI', () => {
  it('renders properly', () => {
    const wrapper = mount(ErrorUI)
    expect(wrapper.text()).toContain(
      'Problèmes de connexion, veuillez contacter votre administrateur'
    )
  })
})
