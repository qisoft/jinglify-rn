const type = {
  base: 'System',
  roboto: 'RobotoMono-Bold'
}

const size = {
  h1: 40,
  h2: 23,
  h3: 24,
  h4: 20,
  timer: 64,
  input: 18,
  hugeButton: 36,
  bigButton: 24,
  regular: 17,
  medium: 16,
  small: 13
}

const style = {
  h1: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.h1
  },
  h2: {
    fontFamily: type.base,
    fontWeight: '700',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.h4
  },
  timer: {
    fontFamily: type.roboto,
    fontWeight: '600',
    fontSize: size.timer
  },
  button: {
    fontFamily: type.base,
    fontWeight: '500',
    fontSize: size.input
  },
  text: {
    fontFamily: type.base,
    fontWeight: '200',
    fontSize: size.medium
  },
  textBold: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.medium
  },
  bigText: {
    fontFamily: type.base,
    fontWeight: '200',
    fontSize: size.input
  },
  bigBoldText: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.input
  },
  songTitle: {
    fontFamily: type.base,
    fontWeight: '500',
    fontSize: size.regular
  },
  songSubtitle: {
    fontFamily: type.base,
    fontWeight: '500',
    fontSize: size.small
  },
  timerSubtitle: {
    fontFamily: type.base,
    fontWeight: '200',
    fontSize: size.input
  },
  hugeButton: {
    fontFamily: type.base,
    fontWeight: '900',
    fontSize: size.hugeButton
  },
  bigButton: {
    fontFamily: type.base,
    fontWeight: '600',
    fontSize: size.bigButton
  }
}

export default {
  type,
  size,
  style
}
