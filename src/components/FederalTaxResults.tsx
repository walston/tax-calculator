import { calculateFederalTax } from '../utils/federalTax.ts'
import {FederalIncomeTaxForm} from '../pages/calculators/IncomeTaxFederal.tsx'

interface FederalIncomeTaxFormProps {
  form: FederalIncomeTaxForm
}
const FederalTaxResults = (props: FederalIncomeTaxFormProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const incomeAsNumber = props.form.income * 1
  const federalIncomeTax = calculateFederalTax(incomeAsNumber)
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
        <li>Federal tax: {federalIncomeTax}</li>
        <li>Social security: {socSecurity}</li>
        <li>Medicare: {medicare}</li>
        <li>Net: {net}</li>
        <li className="fw-bold">Total: ${incomeAsNumber}</li>
      </ul>
    </>
  )
}

export default FederalTaxResults