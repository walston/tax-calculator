import FederalTaxResults from '../../components/FederalTaxResults.tsx'
import FederalTaxForm from '../../components/FederalTaxForm.tsx'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers.ts'

const FederalIncomeTax = () => {
  const taxForm = useSelector((state: AppState) => state.taxForm)

  return (
    <>
      <h1 className="text-center">2024 Federal Income Tax Calculator</h1>
      <p className="fst-italic text-center">Disclaimer: This provides a basic federal tax estimation, and is not to be used as a substitute
        for a tax professional.</p>
      <hr/>
      <div className="row pt-2">
        <div className="col-12 col-md-6">
          <FederalTaxForm  />
        </div>
        <div className="col-12 col-md-6">
          <h5 className="mb-3">Tax breakdown</h5>
          <FederalTaxResults form={taxForm}/>
        </div>
      </div>
    </>
  )
}

export default FederalIncomeTax
