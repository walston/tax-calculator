import {Form} from 'react-bootstrap'
import {useState} from 'react'
import FederalTaxResults from '../../components/FederalTaxResults.tsx'

export interface FederalIncomeTaxForm {
  income: string
  deductions: string
}

const IncomeTaxFederal = () => {
  const [formData, setFormData] = useState<FederalIncomeTaxForm>({
    income: '',
    deductions: ''
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
      <h2>2024</h2>
      <p className="fst-italic">Disclaimer: This provides a basic tax estimation, and is not to be used as a substitute
        for a tax professional.</p>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Form>
            <legend>Income information</legend>
            <Form.Group className="mb-3" controlId="incomeTax.income">
              <Form.Label>Annual income</Form.Label>
              <Form.Control
                type="text"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeTax.deductions">
              <Form.Label>Deductions</Form.Label>
              <Form.Control
                type="text"
                name="deductions"
                value={formData.deductions}
                onChange={handleInputChange}
              />
            </Form.Group>
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