const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th"
  const suffixes = ["th", "st", "nd", "rd"]
  return suffixes[day % 10 > 3 ? 0 : day % 10]
}

export default getOrdinalSuffix
