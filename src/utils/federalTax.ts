// Define a function to calculate federal tax
export const calculateFederalTax = (income: number): number => {
  let tax = 0;

  for (let x = 0; x < taxBrackets.length; x++) {
    const bracket: TaxBracket = taxBrackets[x]
    const baseTax: number = bracket.baseTax

    if (income <= bracket.max) {
      tax = baseTax + ((income - baseTax) * bracket.taxRate)
      break;
    }

    // means we got to the end
    if (bracket.max === -1) {
      tax = baseTax + ((income - baseTax) * bracket.taxRate)
    }
  }

  return tax;
};

export interface TaxOwed {
  total: number
}

interface TaxBracket {
  max: number
  taxRate: number
  taxableIncomeBracket: string
  taxOwed: string
  baseTax: number
}

// Define federal income tax brackets for single filers
const taxBrackets: TaxBracket[] = [
  {
    "max": 11000,
    "taxRate": 0.10,
    "taxableIncomeBracket": "$0 to $11,000.",
    "taxOwed": "10% of taxable income.",
    "baseTax": 0 // Base tax for the first bracket
  },
  {
    "max": 44725,
    "taxRate": 0.12,
    "taxableIncomeBracket": "$11,001 to $44,725.",
    "taxOwed": "$1,100 plus 12% of the amount over $11,000.",
    "baseTax": 1100 // Base tax for the second bracket
  },
  {
    "max": 95375,
    "taxRate": 0.22,
    "taxableIncomeBracket": "$44,726 to $95,375.",
    "taxOwed": "$5,147 plus 22% of the amount over $44,725.",
    "baseTax": 5147 // Base tax for the third bracket
  },
  {
    "max": 182100,
    "taxRate": 0.24,
    "taxableIncomeBracket": "$95,376 to $182,100.",
    "taxOwed": "$16,290 plus 24% of the amount over $95,375.",
    "baseTax": 16290 // Base tax for the fourth bracket
  },
  {
    "max": 231250,
    "taxRate": 0.32,
    "taxableIncomeBracket": "$182,101 to $231,250.",
    "taxOwed": "$37,104 plus 32% of the amount over $182,100.",
    "baseTax": 37104 // Base tax for the fifth bracket
  },
  {
    "max": 578125,
    "taxRate": 0.35,
    "taxableIncomeBracket": "$231,251 to $578,125.",
    "taxOwed": "$52,832 plus 35% of the amount over $231,250.",
    "baseTax": 52832 // Base tax for the sixth bracket
  },
  {
    "max": -1,
    "taxRate": 0.37,
    "taxableIncomeBracket": "$578,126 or more.",
    "taxOwed": "$174,238.25 plus 37% of the amount over $578,125.",
    "baseTax": 174238.25 // Base tax for the seventh bracket
  }
]

console.log(taxBrackets);
