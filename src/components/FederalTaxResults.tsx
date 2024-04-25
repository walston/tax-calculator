import {ADDITIONAL_MEDICARE_TAX, calculateFederalTax, calculateMedicareTax, MEDICARE_TAX} from '../utils/federalTax.ts'
import {FederalIncomeTaxForm} from './FederalTaxForm.tsx'
import {NumericFormat, numericFormatter} from 'react-number-format'

interface FederalIncomeTaxFormProps {
  form: FederalIncomeTaxForm
}

export const OASDI_MAX = 168600
export const OASDI_TAX = .062

const FederalTaxResults = (props: FederalIncomeTaxFormProps) => {
  const taxForm = props.form
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const incomeAsNumber = taxForm.income.replace(/[^\d.]/g, '') * 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const deductionsAsNumber = taxForm.deductions.replace(/[^\d.]/g, '') * 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const retirementPretaxAsNumber = taxForm.retirementPretax.replace(/[^\d.]/g, '') * 1
  const taxableIncome = incomeAsNumber - deductionsAsNumber - retirementPretaxAsNumber
  const federalIncomeTax = calculateFederalTax(taxableIncome, taxForm.filingStatus)

  // calculate social security
  const socSecurity = incomeAsNumber > OASDI_MAX ?  OASDI_MAX * OASDI_TAX : incomeAsNumber * OASDI_TAX
  const medicare = calculateMedicareTax(incomeAsNumber, taxForm.filingStatus)
  const net = incomeAsNumber - federalIncomeTax - socSecurity - medicare.totalMedicare - retirementPretaxAsNumber

  const effectiveIncomeTaxRate = incomeAsNumber > 0 && taxableIncome > 0 ? federalIncomeTax/taxableIncome : 0

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
            <td className="text-danger">Social security ({(OASDI_TAX * 100).toFixed(2)}%){incomeAsNumber > OASDI_MAX && <sup>1</sup>}:</td>
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
            <td className="text-danger">Medicare ({(MEDICARE_TAX * 100).toFixed(2)}%):</td>
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
              <td className="text-danger">Additional Medicare ({(ADDITIONAL_MEDICARE_TAX * 100).toFixed(2)}%)<sup>☨</sup>:</td>
              <td className="text-danger text-end">{numericFormatter((medicare.additionalMedicare).toFixed(2).toString(), {decimalScale: 2, fixedDecimalScale: true, prefix: '$', thousandSeparator: ','})}</td>
            </tr>
          }
          <tr>
            <td className="text-success">Net (Take home pay)<sup>*</sup>:</td>
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
      {incomeAsNumber > OASDI_MAX &&
        <p className="small"><sup>1</sup> Great news! Your annual income is over the maximum Social Security tax threshold for 2024 of $168,600. Your Social Security tax is capped at $10,453.20.</p>
      }
      {medicare.additionalMedicare > 0 &&
        <p className="small"><sup>☨</sup> Single filers making over $200,000 pay an additional {(ADDITIONAL_MEDICARE_TAX * 100).toFixed(2)}% tax towards
          Medicare on earnings above $200,000.</p>
      }
      <p className="small"><sup>*</sup> This does not include state income taxes. Unless you live in Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington or Wyoming you will owe additional income taxes for your state(s) of residency.</p>
    </>
  )
}

export default FederalTaxResults
