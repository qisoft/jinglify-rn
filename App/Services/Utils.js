export default class Utils {
  static getRandom (from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from
  }

  static pad (number, size) {
    let s = String(number)
    while (s.length < (size || 2)) { s = '0' + s }
    return s
  }
}
