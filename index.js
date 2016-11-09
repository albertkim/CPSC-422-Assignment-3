function ABProbability(A, B) {
  if (!A && !B) {
    return 30
  } else if (!A && B) {
    return 5
  } else if (A && !B) {
    return 1
  } else {
    return 10
  }
}

function BCProbability(B, C) {
  if (!B && !C) {
    return 100
  } else if (!B && C) {
    return 1
  } else if (B && !C) {
    return 1
  } else {
    return 100
  }
}

function CDProbability(C, D) {
  if (!C && !D) {
    return 1
  } else if (!C && D) {
    return 100
  } else if (C && !D) {
    return 100
  } else {
    return 1
  }
}

function DAProbability(D, A) {
  if (!D && !A) {
    return 100
  } else if (!D && A) {
    return 1
  } else if (D && !A) {
    return 1
  } else {
    return 100
  }
}

function sampleFromUnNormalizedRange(value1, value0) {
  const total = value1 + value0
  const value1Probability = value1/total
  const randomNumber = Math.random()
  const sample = randomNumber <= value1Probability
  return sample
}

// Initial State

let A = true
const B = true
let C = true
let D = true

let A1Count = 0
let A0Count = 0

function getNextSamplingVariable() {
  if (currentSamplingVariable === 'A') {
    return 'C'
  } else if (currentSamplingVariable === 'C') {
    return 'D'
  } else {
    return 'A'
  }
}

function sampleVariable(variable) {
  if (variable === 'A') {
    const A1 = ABProbability(1, B) * DAProbability(D, 1)
    const A0 = ABProbability(0, B) * DAProbability(D, 0)
    const sample = sampleFromUnNormalizedRange(A1, A0)
    if (sample) {
      A1Count++
    } else {
      A0Count++
    }
    A = sample
  } else if (variable === 'C') {
    const C1 = BCProbability(B, 1) * CDProbability(1, D)
    const C0 = BCProbability(B, 0) * CDProbability(0, D)
    const sample = sampleFromUnNormalizedRange(C1, C0)
    C = sample
  } else if (variable === 'D') {
    const D1 = CDProbability(C, 1) * DAProbability(1, A)
    const D0 = CDProbability(C, 0) * DAProbability(0, A)
    const sample = sampleFromUnNormalizedRange(D1, D0)
    D = sample
  }
}

// Main execution

const numberOfSamples = 1000

let currentSamplingVariable = 'A'
for (let i = 0; i < numberOfSamples; i++) {
  console.log('currentSamplingVariable: ' + currentSamplingVariable)
  sampleVariable(currentSamplingVariable)
  currentSamplingVariable = getNextSamplingVariable()
}

console.log('A1 count: ' + A1Count)
console.log('A0 count: ' + A0Count)
