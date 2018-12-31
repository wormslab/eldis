export function numberingWithDefault (s, ary, number = 1) {
  if (!ary.includes(s)) {
    return s
  }

  if (ary.includes(`${s}-${number}`)) {
    return numberingWithDefault(s, ary, number + 1)
  } else {
    return `${s}-${number}`
  }
}
