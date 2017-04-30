//
// Created by Innokentiy Shushpanov on 18/03/2017.
// Copyright (c) 2017 Innokentiy Shushpanov. All rights reserved.
//

import Foundation
import MediaPlayer
import AVKit
import AVFoundation

@objc(AudioPlayer)
class AudioPlayer : NSObject, MPMediaPickerControllerDelegate {
  private var beepPlayer : AVAudioPlayer?
  private var shortBeepPlayer : AVAudioPlayer?
  private var throwGoalBeepPlayer : AVAudioPlayer?
  private var fadingCurveIdx = 0
  private var isFading = false
  private var jinglePlayer: JinglePlayer?
  private var callback: RCTResponseSenderBlock?
  
  private var beepTimer: Timer?
  private var playerTimer: Timer?
  
  override init() {
    super.init()
    do {
      try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
    } catch{ }
    self.beepPlayer = self.getAudioPlayer(forFile: "beep-01a", withExtension: "wav")
    self.shortBeepPlayer = self.getAudioPlayer(forFile: "beep-02", withExtension: "wav")
    self.throwGoalBeepPlayer = self.getAudioPlayer(forFile: "beep-03", withExtension: "wav")
  }
  
  deinit {
    stopPlayers()
  }
  
  @objc func vibrate(){
    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
  }
  
  @objc(getTracks:) func getTracks(callback: @escaping RCTResponseSenderBlock) {
    self.callback = callback
    let picker = MPMediaPickerController(mediaTypes: .music)
    picker.allowsPickingMultipleItems = true
    picker.delegate = self
    UIApplication.shared.keyWindow?.rootViewController?.present(picker, animated: true)
  }
  
  func mediaPicker(_ mediaPicker: MPMediaPickerController, didPickMediaItems mediaItemCollection: MPMediaItemCollection) {
    let items = mediaItemCollection.items.map({ item in
      return self.transformMediaItem(item: item)
    })
    self.callback?([NSNull(), items])
    self.callback = nil
    mediaPicker.dismiss(animated: true, completion: nil)
  }
  
  func mediaPickerDidCancel(_ mediaPicker: MPMediaPickerController) {
    mediaPicker.dismiss(animated: true, completion: nil)
  }
  
  private func transformMediaItem(item: MPMediaItem) -> Dictionary<String, Any> {
    return [
      "title": item.title ?? "",
      "artist": item.artist ?? "",
      "persistentId": item.persistentID,
      "album": item.albumTitle ?? "",
      "artwork": transformImageToDataUrl(image: item.artwork?.image(at: CGSize(width: 60, height: 60))),
      "assetUrl": item.assetURL?.absoluteString ?? ""
    ]
  }
  
  private func transformImageToDataUrl(image: UIImage?) -> String {
    
    if let img = image {
      if let data = UIImagePNGRepresentation(img) {
        return "data:image/jpeg;base64,\(data.base64EncodedString())"
      }
    }
    return "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="
  }
  
  @objc(changeSong:artistTitle:) func changeSong(songTitle: NSString, artistTitle: NSString) {
    let query = MPMediaQuery()
    query.addFilterPredicate(MPMediaPropertyPredicate(value: songTitle,
                                                      forProperty: MPMediaItemPropertyTitle))
    query.addFilterPredicate(MPMediaPropertyPredicate(value: artistTitle,
                                                      forProperty: MPMediaItemPropertyArtist))
    if let song = query.items?.first
    {
      jinglePlayer = song.assetURL == nil ? MusicPlayer() : AvMusicPlayer()
      jinglePlayer?.setJingle(song: song)
    }
  }
  
  @objc func pauseJingle(){
    jinglePlayer?.pause()
  }
  
  private func getAudioPlayer(forFile : String, withExtension : String) -> AVAudioPlayer?{
    if let url = Bundle.main.url(forResource: forFile, withExtension: withExtension){
      do {
        return try AVAudioPlayer(contentsOf: url)
      } catch { }
    }
    return nil
  }
  
  @objc func playJingle(){
    jinglePlayer?.play()
  }
  
  @objc func longBeep(){
    beepPlayer?.play()
  }
  
  @objc func throwingGoalBeep(){
    self.throwGoalBeepPlayer?.play()
  }
  
  @objc(beep:) func beep(times: NSNumber){
    DispatchQueue.main.async {
      var beepsLeft = times
      print(beepsLeft)
      self.beepTimer = Timer.scheduledTimer(withTimeInterval: 0.7, repeats: true, block: { timer in
        beepsLeft = NSNumber.init(value: beepsLeft.intValue - 1)
        self.shortBeepPlayer?.play()
        if(beepsLeft == 0){
          timer.invalidate()
          self.beepTimer = nil
        }
      })
    }
  }

  @objc func stopPlayers(){
    beepTimer?.invalidate()
    beepTimer = nil
    jinglePlayer?.stop()
  }

  func fadeOutAndStopPlayer(){
    jinglePlayer?.fadeOutAndStop()
  }
}
