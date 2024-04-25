import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {NumericFormat} from 'react-number-format'
import {updateTaxData} from '../actions.ts'
import {AppState} from '../reducers.ts'
import React from 'react'

export interface FederalIncomeTaxForm {
  useStandardDeduction: boolean
  filingStatus: string
  income: string
  deductions: string
  retirementPretax: string
}

const FederalTaxForm = () => {
  const dispatch = useDispatch()
  const formData = useSelector((state: AppState) => state.taxForm)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    const newValue = name === 'useStandardDeduction' ? checked : value
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(updateTaxData({ [name]: newValue }))
  }

  return (
    <Form>
      <legend className="h5 mb-3">Income information</legend>
      <Form.Group className="mb-3" controlId="incomeTax.filingStatus">
        <Form.Label>Filing status</Form.Label><br/>
        <Form.Check
          inline
          label="Single"
          name="filingStatus"
          type="radio"
          value="single"
          id={`inline-radio-1`}
          checked={formData.filingStatus === 'single'}
          onChange={handleInputChange}
        />
        <Form.Check
          inline
          label="Married filing jointly"
          name="filingStatus"
          type="radio"
          value="mfj"
          id={`inline-radio-2`}
          checked={formData.filingStatus === 'mfj'}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="incomeTax.income">
        <Form.Label>Annual income</Form.Label>
        <NumericFormat
          id="incomeTax.income"
          className="form-control"
          type="text"
          name="income"
          prefix={'$'}
          allowNegative={false}
          thousandSeparator=","
          value={formData.income}
          onChange={handleInputChange}
          maxLength={15}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          placeholder="$"
          autoFocus={true}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="incomeTax.deductions">
        <Form.Label>Deductions</Form.Label>
        <NumericFormat
          id="incomeTax.deductions"
          className="form-control"
          type="text"
          name="deductions"
          prefix={'$'}
          allowNegative={false}
          thousandSeparator=","
          value={formData.deductions}
          onChange={handleInputChange}
          maxLength={15}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          placeholder="$"
          disabled={formData.useStandardDeduction === true}
        />
        <Form.Check
          inline
          label="Use standard deduction"
          name="useStandardDeduction"
          id="useStandardDeduction"
          checked={formData.useStandardDeduction}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="incomeTax.retirementPretax">
        <Form.Label>401k contributions</Form.Label>
        <NumericFormat
          id="incomeTax.retirementPretax"
          className="form-control"
          type="text"
          name="retirementPretax"
          prefix={'$'}
          allowNegative={false}
          thousandSeparator=","
          value={formData.retirementPretax}
          onChange={handleInputChange}
          maxLength={15}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          placeholder="$"
          required={true}
        />
        <small className="fst-italic text-muted">The maximum 401k contribution for 2024 is $23,000.00 per individual.</small>
      </Form.Group>
    </Form>
  )
}

export default FederalTaxForm
