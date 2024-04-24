interface FederalTaxBracket {
  min: number
  taxRate: number
  taxableIncomeBracket: string
  taxOwed: string
  baseTax: number
}

export interface MedicareTax {
  medicare: number
  additionalMedicare: number
  totalMedicare: number
}

export const MEDICARE_THRESHHOLD = 200000
export const ADDITIONAL_MEDICARE_TAX = .009
export const MEDICARE_TAX = .0145
export const calculateFederalTax = (income: number): number => {
  if (income < 0) {
    return 0
  }
  let tax = 0

  for (let x = 0; x < taxBracketsSingle2024.length; x++) {
    const bracket: FederalTaxBracket = taxBracketsSingle2024[x]
    const baseTax: number = bracket.baseTax

    if (income > bracket.min) {
      tax = baseTax + ((income - bracket.min) * bracket.taxRate)
    }
  }

  return tax
}

export const calculateMedicareTax = (income: number): MedicareTax => {
  const additionalMedicare = (income - MEDICARE_THRESHHOLD) * ADDITIONAL_MEDICARE_TAX
  const medicare = income * MEDICARE_TAX
  const totalMedicare = medicare + additionalMedicare > 0 ? additionalMedicare : 0

  return {
    medicare,
    additionalMedicare,
    totalMedicare
  }
}

export const taxBracketsSingle2023: FederalTaxBracket[] = [
  {
    "min": 0,
    "taxRate": 0.10,
    "taxableIncomeBracket": "$0 to $11,000.",
    "taxOwed": "10% of taxable income.",
    "baseTax": 0 // Base tax for the first bracket
  },
  {
    "min": 11001,
    "taxRate": 0.12,
    "taxableIncomeBracket": "$11,001 to $44,725.",
    "taxOwed": "$1,100 plus 12% of the amount over $11,000.",
    "baseTax": 1100 // Base tax for the second bracket
  },
  {
    "min": 44726,
    "taxRate": 0.22,
    "taxableIncomeBracket": "$44,726 to $95,375.",
    "taxOwed": "$5,147 plus 22% of the amount over $44,725.",
    "baseTax": 5147 // Base tax for the third bracket
  },
  {
    "min": 95376,
    "taxRate": 0.24,
    "taxableIncomeBracket": "$95,376 to $182,100.",
    "taxOwed": "$16,290 plus 24% of the amount over $95,375.",
    "baseTax": 16290 // Base tax for the fourth bracket
  },
  {
    "min": 182101,
    "taxRate": 0.32,
    "taxableIncomeBracket": "$182,101 to $231,250.",
    "taxOwed": "$37,104 plus 32% of the amount over $182,100.",
    "baseTax": 37104 // Base tax for the fifth bracket
  },
  {
    "min": 231251,
    "taxRate": 0.35,
    "taxableIncomeBracket": "$231,251 to $578,125.",
    "taxOwed": "$52,832 plus 35% of the amount over $231,250.",
    "baseTax": 52832 // Base tax for the sixth bracket
  },
  {
    "min": 578126,
    "taxRate": 0.37,
    "taxableIncomeBracket": "$578,126 or more.",
    "taxOwed": "$174,238.25 plus 37% of the amount over $578,125.",
    "baseTax": 174238.25 // Base tax for the seventh bracket
  }
]


// Define federal income tax brackets for single filers
const taxBracketsSingle2024: FederalTaxBracket[] = [
  {
    "min": 0,
    "taxRate": 0.10,
    "taxableIncomeBracket": "$0 to $11,600.",
    "taxOwed": "10% of taxable income.",
    "baseTax": 0 // Base tax for the first bracket
  },
  {
    "min": 11601,
    "taxRate": 0.12,
    "taxableIncomeBracket": "$11,001 to $47,150.",
    "taxOwed": "$1,160 plus 12% of the amount over $11,600.",
    "baseTax": 1160 // Base tax for the second bracket
  },
  {
    "min": 47151,
    "taxRate": 0.22,
    "taxableIncomeBracket": "$47,151 to $100,525.",
    "taxOwed": "$5,426 plus 22% of the amount over $47,150.",
    "baseTax": 5426 // Base tax for the third bracket
  },
  {
    "min": 100526,
    "taxRate": 0.24,
    "taxableIncomeBracket": "$100,526 to $191,950.",
    "taxOwed": "$17,168.50 plus 24% of the amount over $100,525.",
    "baseTax": 17168.50 // Base tax for the fourth bracket
  },
  {
    "min": 191951,
    "taxRate": 0.32,
    "taxableIncomeBracket": "$191,951 to $243,725.",
    "taxOwed": "$39,110.50 plus 32% of the amount over $191,950.",
    "baseTax": 39110.50 // Base tax for the fifth bracket
  },
  {
    "min": 243726,
    "taxRate": 0.35,
    "taxableIncomeBracket": "$243,726 to $609,350.",
    "taxOwed": "$55,678.50 plus 35% of the amount over $243,725.",
    "baseTax": 55678.50 // Base tax for the sixth bracket
  },
  {
    "min": 609351,
    "taxRate": 0.37,
    "taxableIncomeBracket": "$609,351 or more.",
    "taxOwed": "$183,647.25 plus 37% of the amount over $609,350.",
    "baseTax": 183647.25 // Base tax for the seventh bracket
  }
]
