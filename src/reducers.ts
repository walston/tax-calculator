import {FederalIncomeTaxForm} from './components/FederalTaxForm.tsx'
import {Action} from 'redux'

export interface AppState {
  taxForm: FederalIncomeTaxForm
}

const initialState = {
  taxForm: {
    filingStatus: 'single',
    income: '',
    deductions: '',
    retirementPretax: ''
  }
}
interface UpdateTaxDataAction extends Action {
  type: 'UPDATE_TAX_DATA';
  payload: Partial<FederalIncomeTaxForm>;
}

const formReducer = (state = initialState, action: UpdateTaxDataAction) => {
  switch (action.type) {
    case 'UPDATE_TAX_DATA':
      return {
        ...state,
        taxForm: { ...state.taxForm, ...action.payload }
      };
    default:
      return state;
  }
}

export default formReducer
