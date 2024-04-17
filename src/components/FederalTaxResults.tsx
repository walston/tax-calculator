import { calculateFederalTax } from '../utils/federalTax.ts'
import {FederalIncomeTaxForm} from '../pages/calculators/IncomeTaxFederal.tsx'
import {NumericFormat} from 'react-number-format'

interface FederalIncomeTaxFormProps {
  form: FederalIncomeTaxForm
}
const FederalTaxResults = (props: FederalIncomeTaxFormProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const incomeAsNumber = props.form.income * 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const deductionsAsNumber = props.form.deductions * 1
  const federalIncomeTax = calculateFederalTax(incomeAsNumber - deductionsAsNumber)
  const socSecurity = incomeAsNumber * .062
  const medicare = incomeAsNumber * .0145
  const net = incomeAsNumber - federalIncomeTax - socSecurity - medicare

  // const taxBreakdown = [
  //   { label: 'Federal income tax', value: federalIncomeTax },
  //   { label: 'Social Security', value: socSecurity },
  //   { label: 'Medicare', value: medicare },
  //   { label: 'Net', value: net },
  // ]

  return (
    <>
      <h4>Tax breakdown</h4>
      <ul>
        <li>
          <span className="me-1">Federal tax:</span>
          <NumericFormat
            value={federalIncomeTax}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </li>
        <li>
          <span className="me-1">Social security:</span>
          <NumericFormat
            value={socSecurity}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </li>
        <li>
          <span className="me-1">Medicare:</span>
          <NumericFormat
            value={medicare}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </li>
        <li>
          <span className="me-1">Net:</span>
          <NumericFormat
            value={net}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </li>
        <li className="fw-bold">
          Total:
          <NumericFormat
            value={incomeAsNumber}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </li>
      </ul>
    </>
  )
}

export default FederalTaxResults