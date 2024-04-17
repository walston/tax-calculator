import {Form} from 'react-bootstrap'

const IncomeTaxFederal = () => {
  return (
    <>
      <h1>Federal Income Tax Calculator</h1>
      <h2>2024</h2>
      <p className="fst-italic">Disclaimer: This provides a basic tax estimation, and is not to be used as a substitute for a tax professional.</p>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Form>
            <legend>Income information</legend>
            <Form.Group className="mb-3" controlId="incomeTax.salary">
              <Form.Label>Annual salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="$45,000"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeTax.deductions">
              <Form.Label>Deductions</Form.Label>
              <Form.Control
                type="text"
                placeholder="$14,600"
                name="incomeTax.deductions"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="incomeTax.filingStatus">
              <Form.Label>Filing status</Form.Label><br/>
              <Form.Check
                inline
                label="Single"
                name="incomeTax.filingStatus"
                type="radio"
                id={`inline-radio-1`}
                checked={true}
              />
              <Form.Check
                inline
                label="Married filing jointly"
                name="incomeTax.filingStatus"
                type="radio"
                id={`inline-radio-2`}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="col-12 col-lg-6">
          <h3>Tax breakdown</h3>
        </div>
      </div>
    </>
  )
}

export default IncomeTaxFederal