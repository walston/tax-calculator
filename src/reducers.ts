import {FederalIncomeTaxForm} from './components/FederalTaxForm.tsx'
import {Action} from 'redux'
import {federalTax} from './utils/federalTax.ts'
import {cloneDeep} from 'lodash'

export interface AppState {
  taxForm: FederalIncomeTaxForm
}

const initialState = {
  taxForm: {
    filingStatus: 'single',
    income: '',
    deductions: '14600',
    retirementPretax: '',
    useStandardDeduction: true
  }
}
interface UpdateTaxDataAction extends Action {
  type: 'UPDATE_TAX_DATA';
  payload: Partial<FederalIncomeTaxForm>;
}

const formReducer = (state = initialState, action: UpdateTaxDataAction) => {
  const taxForm = cloneDeep(state.taxForm)
  switch (action.type) {
    case 'UPDATE_TAX_DATA':
      // action.payload is perfectly mapped to the taxForm data-structure
      // therefore we safely update w/out checks
      Object.assign(taxForm, action.payload);

      // now that taxForm is synced with the NEXT state being processed
      // update deductions
      if (taxForm.useStandardDeduction) {
        taxForm.deductions = federalTax[taxForm.filingStatus as 'mfj' | 'single'].standardDeduction.toString()
      }

      return { ...state, taxForm };
    default:
      return state;
  }
}

export default formReducer
