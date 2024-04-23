import FederalTaxResults from '../../components/FederalTaxResults.tsx'
import FederalTaxForm, {FederalIncomeTaxForm} from '../../components/FederalTaxForm.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {updateTaxData} from '../../actions.ts'
import {AppState} from '../../reducers.ts'

const IncomeTaxFederal = () => {
  const taxForm = useSelector((state: AppState) => state.taxForm)
  const dispatch = useDispatch()

  const handleTaxDataChange = (data: FederalIncomeTaxForm) => {
    dispatch(updateTaxData(data))
  }

  return (
    <>
      <h1>2024 Federal Income Tax Calculator</h1>
      <p className="fst-italic">Disclaimer: This provides a basic federal tax estimation, and is not to be used as a substitute
        for a tax professional.</p>
      <div className="row">
        <div className="col-12 col-lg-6">
          <FederalTaxForm onChange={handleTaxDataChange} />
        </div>
        <div className="col-12 col-lg-6">
          <h3>Tax breakdown</h3>
          <FederalTaxResults form={taxForm}/>
        </div>
      </div>
    </>
  )
}

export default IncomeTaxFederal
