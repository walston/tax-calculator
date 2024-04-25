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
      if (taxForm.useStandardDeduction) {
        taxForm.deductions = (taxForm.filingStatus === 'single') ? federalTax.single.standardDeduction.toString() : federalTax.mfj.standardDeduction.toString()
      }

      return {
        ...state,
        taxForm: { ...taxForm, ...action.payload }
      };
    default:
      return state;
  }
}

export default formReducer
