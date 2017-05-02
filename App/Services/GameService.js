import gameActions from '../Redux/GameRedux'
import { NativeModules } from 'react-native'
const AudioPlayer = NativeModules.AudioPlayer

export default class Game {
  constructor (dispatch, state) {
    this.dispatch = dispatch
    this.settings = state.gameSettings
    this.initialBeepOffset = 0
    this.totalMatchTime = 0
    this.mathTimeLeft = 0
    this.currentPeriod = 0
    this.totalPeriods = this.settings.periodsCount >= 1 ? this.settings.periodsCount : 1
    this.isOvertime = false
    this.gameEndCallback = () => {}
  }

  startNewPeriod () {
    let idx = Math.floor(Math.random() * (this.settings.songs.length - 1))
    let song = this.settings.songs[idx]
    if (song === undefined) {
      song = {
        title: 'song',
        artist: 'mock'
      }
    }
    AudioPlayer.changeSong(song.title, song.artist)
    this.currentPeriod = this.currentPeriod + 1
    this.initialBeepOffset = Game.getRandomBeepTime()
    this.totalMatchTime = this.settings.matchTime * 60 + 30 + this.initialBeepOffset
    this.dispatch(gameActions.setCurrentPeriod(this.currentPeriod))
    this.dispatch(gameActions.setTotalMatchTime(this.totalMatchTime))
    this.matchTimeLeft = this.totalMatchTime
    if (this.currentPeriod > 1) {
      this.matchTimeLeft = this.matchTimeLeft + 10
    }
    this.dispatch(gameActions.setMatchTimeLeft(this.matchTimeLeft))
  }

  startGame (gameEndCallback) {
    this.startNewPeriod()
    this.setupGameTimer()
    this.gameEndCallback = gameEndCallback
  }

  setupGameTimer () {
    if (this.gameTimer !== undefined) {
      clearInterval(this.gameTimer)
    }

    this.update()
    this.gameTimer = setInterval(() => {
      if (!this.isOvertime) {
        console.log(this.matchTimeLeft)
        this.matchTimeLeft = this.matchTimeLeft - 1
        this.dispatch(gameActions.setMatchTimeLeft(this.matchTimeLeft))
      }
      this.update()
    }, 1000)
  }

  pauseGame () {
    this.isPaused = true
    this.invalidateTimers()
    this.dispatch(gameActions.setStatus('Paused'))
    if (this.isJinglePlaying) {
      AudioPlayer.pauseJingle()
    }
  }

  resumeGame () {
    this.isPaused = false
    this.setupGameTimer()
    if (this.isJinglePlaying) {
      AudioPlayer.playJingle()
    }
  }

  stopGame () {
    this.invalidateTimers()
    AudioPlayer.stopPlayers()
    this.gameEndCallback()
  }

  playJingle () {
    this.isJinglePlaying = true
    AudioPlayer.playJingle()
  }

  throwAPuck () {
    this.dispatch(gameActions.setStatus('Get Ready!'))
    this.isPaused = true
    AudioPlayer.vibrate()
    if (this.isJinglePlaying) {
      AudioPlayer.pauseJingle()
    }

    this.invalidateTimers()
    let beepTime = Game.getRandomBeepTime() * 1000
    this.throwingTimer = setTimeout(() => {
      this.beepForThrowing()
      if (this.isJinglePlaying) {
        AudioPlayer.playJingle()
      }
      this.setupGameTimer()
    }, beepTime)
  }

  beepForThrowing () {
    AudioPlayer.longBeep()
    this.throwingGoalTimer = setTimeout(() => {
      AudioPlayer.throwingGoalBeep()
    }, 3000)
  }

  static getRandomBeepTime () {
    return Math.floor(Math.random() * 2) + 2;
  }

  invalidateTimers () {
    clearInterval(this.gameTimer)
    this.gameTimer = undefined
    clearInterval(this.throwingTimer)
    this.throwingTimer = undefined
    clearInterval(this.throwingGoalTimer)
    this.throwingGoalTimer = undefined
  }

  getStatus (timeLeft, timeSpent) {
    if (timeSpent < 0) {
      return 'Change your sides!'
    }
    if (timeLeft <= this.settings.matchTime * 60){
      return ''
    }
    if (timeSpent >= 0 && timeSpent <= 27) {
      return 'Warm-up!'
    }

    return 'Get Ready!'
  }

  startOvertime() {
    this.isOvertime = true
    this.currentPeriod = 0
    this.dispatch(gameActions.setCurrentPeriod(this.currentPeriod))
  }

  update () {
    let timeLeft = this.matchTimeLeft
    let timeSpent = this.totalMatchTime - this.matchTimeLeft
    this.dispatch(gameActions.setStatus(this.getStatus(timeLeft, timeSpent)))

    // make this function idempotent
    if (this.lastHandledTime === timeSpent) {
      return
    }
    this.lastHandledTime = timeSpent

    console.log(`time spent: ${timeSpent}, time left: ${timeLeft}`)
    if (timeSpent === 0) {
      this.playJingle()
    } else if (timeSpent === 22) {
      AudioPlayer.fadeOutAndStopPlayer()
    } else if (timeSpent === 30) {
      this.isJinglePlaying = false
    } else if (timeSpent === 30 + this.initialBeepOffset){
      this.beepForThrowing()
    }
    if (timeLeft === 0) {
      AudioPlayer.longBeep()
      this.isJinglePlaying = false
      if (this.currentPeriod === this.totalPeriods) {
        this.startOvertime()
      } else {
        this.startNewPeriod()
      }
    } else if (timeLeft === 7) {
      AudioPlayer.fadeOutAndStopPlayer()
    } else if (timeLeft === 30) {
      this.playJingle()
    } else if (timeLeft > 59 && timeLeft < this.settings.matchTime * 60 && timeLeft % 60 === 0) {
      AudioPlayer.beep(timeLeft / 60)
    }
  }
}
