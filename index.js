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
