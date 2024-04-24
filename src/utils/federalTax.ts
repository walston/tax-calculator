export interface MedicareTax {
  medicare: number
  additionalMedicare: number
  totalMedicare: number
}

export const ADDITIONAL_MEDICARE_TAX = .009
export const MEDICARE_TAX = .0145

export const calculateFederalTax = (income: number, filingStatus = 'single'): number => {
  if (income < 0) {
    return 0
  }
  let tax = 0

  const taxBracket = (filingStatus === 'single') ? federalTax.single.brackets : federalTax.mfj.brackets

  for (let x = taxBracket.length - 1; x >= 0; x--) {
    const bracket = taxBracket[x]
    const baseTax: number = bracket.baseTax

    if (income > bracket.min) {
      tax = baseTax + ((income - bracket.min) * bracket.taxRate)
      break;
    }
  }

  return tax
}

export const calculateMedicareTax = (income: number, filingStatus = 'single'): MedicareTax => {
  const threshold = (filingStatus === 'single') ? federalTax.single.medicareThreshold: federalTax.mfj.medicareThreshold
  const additionalMedicare = (income - threshold) * ADDITIONAL_MEDICARE_TAX
  const medicare = income * MEDICARE_TAX
  const totalMedicare = medicare + additionalMedicare > 0 ? additionalMedicare : 0

  return {
    medicare,
    additionalMedicare,
    totalMedicare
  }
}

export interface TaxDetails {
  standardDeduction: number,
  medicareThreshold: number,
  brackets: TaxBracket[]
}

export interface FederalTax {
  single: TaxDetails,
  mfj: TaxDetails
}

export interface TaxBracket {
  min: number,
  taxRate: number,
  baseTax: number
}

export const federalTax: FederalTax = {
  single: {
    standardDeduction: 14600,
    medicareThreshold: 200000,
    brackets: [{
      "min": 0,
      "taxRate": 0.10,
      "baseTax": 0
    }, {
      "min": 11601,
      "taxRate": 0.12,
      "baseTax": 1160
    }, {
      "min": 47151,
      "taxRate": 0.22,
      "baseTax": 5426
    }, {
      "min": 100526,
      "taxRate": 0.24,
      "baseTax": 17168.50
    }, {
      "min": 191951,
      "taxRate": 0.32,
      "baseTax": 39110.50
    }, {
      "min": 243726,
      "taxRate": 0.35,
      "baseTax": 55678.50
    }, {
      "min": 609351,
      "taxRate": 0.37,
      "baseTax": 183647.25
    }]
  },
  mfj: {
    standardDeduction: 29200,
    medicareThreshold: 250000,
    brackets: [{
      "min": 0,
      "taxRate": 0.10,
      "baseTax": 0
    }, {
      "min": 23201,
      "taxRate": 0.12,
      "baseTax": 2320
    }, {
      "min": 94301,
      "taxRate": 0.22,
      "baseTax": 10852
    }, {
      "min": 201051,
      "taxRate": 0.24,
      "baseTax": 34337
    }, {
      "min": 383901,
      "taxRate": 0.32,
      "baseTax": 78221
    }, {
      "min": 487451,
      "taxRate": 0.35,
      "baseTax": 111357
    }, {
      "min": 731201,
      "taxRate": 0.37,
      "baseTax": 196669.50
    }]
  }
}
