import {Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {NumericFormat} from 'react-number-format'
import {updateTaxData} from '../actions.ts'
import {AppState} from '../reducers.ts'

export interface FederalIncomeTaxForm {
  filingStatus: string
  income: string
  deductions: string
  retirementPretax: string
}

const FederalTaxForm = () => {
  const dispatch = useDispatch()
  const formData = useSelector((state: AppState) => state.taxForm)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleInputChange', e)
    const { name, value } = e.target
    dispatch(updateTaxData({ [name]: value }))
  }

  return (
    <Form>
      <legend>Income information</legend>

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
        />
        <small className="fst-italic text-muted">
          The standard deduction for single filers in 2024 is $14,600.00
        </small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="incomeTax.retirementPretax">
        <Form.Label>401k contributions</Form.Label>
        <NumericFormat
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
        />
        <small className="fst-italic text-muted">The maximum 401k contribution for 2024 is $23,000.00</small>
      </Form.Group>
    </Form>
  )
}

export default FederalTaxForm
