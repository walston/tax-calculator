import {Form} from 'react-bootstrap'
import {useState} from 'react'
import FederalTaxResults from '../../components/FederalTaxResults.tsx'
import {NumericFormat} from 'react-number-format'

export interface FederalIncomeTaxForm {
  income: string
  deductions: string
  retirementPretax: string
}

const IncomeTaxFederal = () => {
  const [formData, setFormData] = useState<FederalIncomeTaxForm>({
    income: '',
    deductions: '',
    retirementPretax: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <h1>Federal Income Tax Calculator</h1>
      <h2>Tax year: 2024</h2>
      <p className="fst-italic">Disclaimer: This provides a basic federal tax estimation, and is not to be used as a substitute
        for a tax professional.</p>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Form>
            <legend>Income information</legend>

            <Form.Group className="mb-3" controlId="incomeTax.filingStatus">
              <Form.Label>Filing status</Form.Label><br/>
              <Form.Check
                inline
                label="Single"
                name="filingStatus"
                type="radio"
                id={`inline-radio-1`}
                checked={true}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="Married filing jointly"
                name="filingStatus"
                type="radio"
                id={`inline-radio-2`}
                disabled={true}
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
              <small className="fst-italic text-muted">The standard deduction for single filers in 2024 is $14,600.00</small>
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
        </div>
        <div className="col-12 col-lg-6">
          <h3>Tax breakdown</h3>
          <FederalTaxResults form={formData}/>
        </div>
      </div>
    </>
  )
}

export default IncomeTaxFederal
