import FederalTaxResults from '../../components/FederalTaxResults.tsx'
import FederalTaxForm from '../../components/FederalTaxForm.tsx'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers.ts'

const FederalIncomeTax = () => {
  const taxForm = useSelector((state: AppState) => state.taxForm)

  return (
    <>
      <h1>2024 Federal Income Tax Calculator</h1>
      <p className="fst-italic mb-0">Disclaimer: This provides a basic federal tax estimation, and is not to be used as a substitute
        for a tax professional.</p>
      <p className="fst-italic">Disclaimer: This does not include state income taxes. Unless you live in Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington or Wyoming you will owe additional income taxes for your state(s) of residency.</p>
      <div className="row">
        <div className="col-12 col-lg-6">
          <FederalTaxForm  />
        </div>
        <div className="col-12 col-lg-6">
          <h3>Tax breakdown</h3>
          <FederalTaxResults form={taxForm}/>
        </div>
      </div>
    </>
  )
}

export default FederalIncomeTax
