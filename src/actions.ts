// actions.js
import {FederalIncomeTaxForm} from './components/FederalTaxForm.tsx'

export const updateTaxData = (data: FederalIncomeTaxForm) => ({
  type: 'UPDATE_TAX_DATA',
  payload: data
})
