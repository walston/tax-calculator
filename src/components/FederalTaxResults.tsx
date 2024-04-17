import { calculateFederalTax } from '../utils/federalTax.ts'
import { FederalIncomeTaxForm} from '../pages/calculators/IncomeTaxFederal.tsx'
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const four01kAsNumber = props.form.four01k * 1
  const taxableIncome = incomeAsNumber - deductionsAsNumber - four01kAsNumber
  const federalIncomeTax = calculateFederalTax(taxableIncome)

  // calculate social security
  const OASDI_MAX = 168600
  const socSecurity = incomeAsNumber > OASDI_MAX ?  OASDI_MAX * .062 : incomeAsNumber * .062
  const medicare = incomeAsNumber * .0145
  const net = incomeAsNumber - federalIncomeTax - socSecurity - medicare

  const effectiveIncomeTaxRate = incomeAsNumber > 0 ? federalIncomeTax/taxableIncome : 0
  // const taxBreakdown = [
  //   { label: 'Federal income tax', value: federalIncomeTax },
  //   { label: 'Social Security', value: socSecurity },
  //   { label: 'Medicare', value: medicare },
  //   { label: 'Net', value: net },
  // ]

  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <td className="text-danger">Federal tax ({effectiveIncomeTaxRate * 100}%):</td>
            <td className="text-danger text-end">
              <NumericFormat
                value={federalIncomeTax}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
          <tr>
            <td className="text-danger">Social security (6.20%):</td>
            <td className="text-danger text-end">
              <NumericFormat
                value={socSecurity}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
          <tr>
            <td className="text-danger">Medicare (1.45%):</td>
            <td className="text-danger text-end">
              <NumericFormat
                value={medicare}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
          <tr>
            <td className="text-success">Net (Take home pay):</td>
            <td className="text-success text-end">
              <NumericFormat
                value={net}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
          <tr className="fw-bold">
            <td className="bg-light">Total:</td>
            <td className="bg-light text-end">
              <NumericFormat
                value={incomeAsNumber}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>☢ Heads up! This does not include state income taxes. Unless you live in Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington or Wyoming you will owe additional income taxes for your state(s) of residency.</p>
      <p className="text-success">{ incomeAsNumber > OASDI_MAX ? '★ Great news! Your annual income is over the maximum Social Security tax threshold for 2024 of $168,600. Your tax is capped at $10,453.20.' : ''}</p>
    </>
  )
}

export default FederalTaxResults
