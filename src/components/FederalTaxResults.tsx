import {calculateFederalTax, calculateMedicareTax} from '../utils/federalTax.ts'
import { FederalIncomeTaxForm} from '../pages/calculators/IncomeTaxFederal.tsx'
import {NumericFormat, numericFormatter} from 'react-number-format'

interface FederalIncomeTaxFormProps {
  form: FederalIncomeTaxForm
}
const FederalTaxResults = (props: FederalIncomeTaxFormProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const incomeAsNumber = props.form.income.replace(/[^\d.]/g, '') * 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const deductionsAsNumber = props.form.deductions.replace(/[^\d.]/g, '') * 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const retirementPretaxAsNumber = props.form.retirementPretax.replace(/[^\d.]/g, '') * 1
  const taxableIncome = incomeAsNumber - deductionsAsNumber - retirementPretaxAsNumber
  const federalIncomeTax = calculateFederalTax(taxableIncome)

  // calculate social security
  const OASDI_MAX = 168600
  // const MEDICARE_THRESHHOLD = 200000
  const socSecurity = incomeAsNumber > OASDI_MAX ?  OASDI_MAX * .062 : incomeAsNumber * .062
  const medicare = calculateMedicareTax(incomeAsNumber)
  const net = incomeAsNumber - federalIncomeTax - socSecurity - medicare.totalMedicare

  const effectiveIncomeTaxRate = incomeAsNumber > 0 ? federalIncomeTax/taxableIncome : 0

  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <td className="text-danger">Federal tax ({numericFormatter((effectiveIncomeTaxRate * 100).toFixed(2).toString(), {decimalScale: 2, fixedDecimalScale: true, suffix: '% effective tax rate'})}):</td>
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
                value={medicare.medicare}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                fixedDecimalScale
              />
            </td>
          </tr>
          {medicare.additionalMedicare > 0 &&
            <tr>
              <td className="text-danger">Additional Medicare (0.9%)<sup>1</sup>:</td>
              <td className="text-danger text-end">${medicare.additionalMedicare.toFixed(2)}</td>
            </tr>
          }
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
      {medicare.additionalMedicare > 0 &&
        <p><sup>1</sup> Single filers making over $200,000 pay an additional 0.9% tax towards Medicare.</p>
      }
      <p className="text-info">Heads up! This does not include state income taxes. Unless you live in Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington or Wyoming you will owe additional income taxes for your state(s) of residency.</p>
      <p className="text-success">{ incomeAsNumber > OASDI_MAX ? '★ Great news! Your annual income is over the maximum Social Security tax threshold for 2024 of $168,600. Your Social Security tax is capped at $10,453.20.' : ''}</p>
    </>
  )
}

export default FederalTaxResults
