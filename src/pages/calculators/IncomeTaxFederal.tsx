import {Form} from 'react-bootstrap'

const IncomeTaxFederal = () => {
  return (
    <>
      <h1>Federal Income Tax Calculator</h1>
      <h2>2024</h2>

      <Form>
        <Form.Group className="mb-3" controlId="incomeTax.salary">
          <Form.Label>Annual salary</Form.Label>
          <Form.Control
            type="text"
            placeholder="$45,000"
          />
        </Form.Group>
      </Form>
    </>
  )
}

export default IncomeTaxFederal