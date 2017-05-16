package com.jinglify

import com.facebook.react.bridge.*
import android.content.Intent
import android.database.Cursor
import android.os.Handler
import android.media.MediaMetadataRetriever
import android.net.Uri
import android.util.Base64
import java.io.File
import android.support.v4.content.ContextCompat
import android.app.Activity
import android.content.Context
import android.media.MediaPlayer
import android.os.Vibrator
import com.facebook.react.bridge.BaseActivityEventListener
import java.util.*
import kotlin.concurrent.timer
import android.os.Build
import android.R.attr.duration
import com.facebook.react.bridge.Arguments.createMap
import com.facebook.react.bridge.Arguments.createArray
import android.support.v4.app.ActivityCompat.startActivityForResult


class AudioPlayerModule(reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {
    var storedCallback : Callback? = null
    var jinglePlayer: MediaPlayer? = null
    var beepTimer: Timer? = null
    var fadingTimer: Timer? = null
    var isFading = false
    var fadingCurveIdx = 0

    fun getPlayerForFile(fileName: String) : MediaPlayer {
        val descriptor = reactApplicationContext.assets.openFd(fileName)
        val player = MediaPlayer()
        player.setDataSource(descriptor.fileDescriptor, descriptor.startOffset, descriptor.length)
        player.prepare()
        return player
    }

    private val shortBeepFile = "beep-02.wav"
    private val longBeepFile = "beep-01a.wav"
    private val throwingBeepFile = "beep-03.wav"

    var shortBeepPlayer = getPlayerForFile(shortBeepFile)

    var longBeepPlayer = getPlayerForFile(longBeepFile)

    var throwingBeepPlayer = getPlayerForFile(throwingBeepFile)

    override fun getName(): String {
        return "AudioPlayer"
    }

    private val listener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity?,
                                      requestCode: Int,
                                      resultCode: Int,
                                      data: Intent?) {
            val handler = Handler()
            handler.postDelayed({
                if (resultCode == Activity.RESULT_OK && requestCode == 10) {
                    if (ContextCompat.checkSelfPermission(reactContext,
                            android.Manifest.permission.READ_EXTERNAL_STORAGE)
                            !== android.content.pm.PackageManager.PERMISSION_GRANTED) {
                        storedCallback?.invoke("NotPermitted", null)
                    } else {
                        val uri = data!!.data
                        val metadata = createMetadataFrom(uri)
                        val arr = Arguments.createArray()
                        val map = Arguments.createMap()
                        map.putString("title", metadata.title)
                        map.putString("artist", metadata.artist)
                        map.putString("year", metadata.year)
                        map.putString("artwork", metadata.artwork)
                        map.putString("playbackUrl", metadata.playbackUrl)
                        map.putString("assetUrl", metadata.playbackUrl)
                        arr.pushMap(map)
                        storedCallback?.invoke(null, arr)
                    }
                } else {
                    storedCallback?.invoke("Cancelled", null)
                }
            }, 1)
        }
    }

    init {
        reactContext.addActivityEventListener(listener)
    }

    private fun createMetadataFrom(uri: Uri): MusicMetadata {
        val meta = MediaMetadataRetriever()
        meta.setDataSource(reactApplicationContext, uri)
        var title: String? = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE)
        val artist = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST)
        var artwork = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="

        try{
            artwork = "data:image/jpeg;base64,${Base64.encodeToString(meta.embeddedPicture, 0)}"
        } catch (e : Exception){

        }

        var year = meta.extractMetadata(MediaMetadataRetriever.METADATA_KEY_YEAR) ?: ""
        // If title is null, we return the filename instead.
        if (title == null) {
            val uriString = uri.toString()
            val myFile = File(uriString)

            if (uriString.startsWith("content://")) {
                var cursor: Cursor? = null
                try {
                    cursor = currentActivity!!.contentResolver.query(uri, null, null, null, null)
                    if (cursor != null && cursor!!.moveToFirst()) {
                        title = cursor!!.getString(cursor!!.getColumnIndex(
                                android.provider.OpenableColumns.DISPLAY_NAME))
                    }
                } finally {
                    cursor!!.close()
                }
            } else if (uriString.startsWith("file://")) {
                title = myFile.getName()
            }
        }


        val metadata = MusicMetadata(uri.toString(), title!!, artist, artwork, year)
        return metadata
    }

    @ReactMethod
    fun getTracks(callback: Callback) {
        this.storedCallback = callback
        try {
            val i = Intent()
            i.action = Intent.ACTION_GET_CONTENT
            i.type = "audio/*"
            i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
            currentActivity?.startActivityForResult(i, 10)
        }
        catch (e : Exception){
            this.storedCallback?.invoke("Failed", null)
        }
    }

    @ReactMethod
    fun playJingle() {
        if(isFading){
            setupFadingTimer()
        }
        jinglePlayer?.start()
    }

    @ReactMethod
    fun throwingGoalBeep() {
        throwingBeepPlayer = getPlayerForFile(throwingBeepFile)
        throwingBeepPlayer.seekTo(0)
        throwingBeepPlayer.setVolume(1.0f, 1.0f)
        throwingBeepPlayer.start()
    }

    @ReactMethod
    fun longBeep() {
        longBeepPlayer = getPlayerForFile(longBeepFile)
        longBeepPlayer.seekTo(0)
        longBeepPlayer.setVolume(1.0f, 1.0f)
        longBeepPlayer.start()
    }

    @ReactMethod
    fun pauseJingle() {
        if (isFading){
            fadingTimer?.cancel()
            fadingTimer = null
        }
        jinglePlayer?.pause()
    }

    private fun isEmulator(): Boolean {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic")
                || "google_sdk" == Build.PRODUCT
    }

    @ReactMethod
    fun changeSong(uri: String) {
        val audioUri = Uri.parse(uri)
        if(uri == "mock" && isEmulator()) {
            jinglePlayer = getPlayerForFile("russian-anthem.mp3")
        }
        else {
            jinglePlayer = MediaPlayer()
            jinglePlayer?.setDataSource(reactApplicationContext, audioUri)
            jinglePlayer?.prepare()
        }

    }

    @ReactMethod
    fun stopPlayers() {
        throwingBeepPlayer.stop()
        longBeepPlayer.stop()
        shortBeepPlayer.stop()
        jinglePlayer?.stop()

        fadingTimer?.cancel()
        fadingTimer = null
        beepTimer?.cancel()
        beepTimer = null
    }

    @ReactMethod
    fun vibrate() {
        //do nothing
    }

    private val volumeCurve : List<Float> = listOf(
            1.0f, 0.8f, 0.6f, 0.4f, 0.2f, 0.1f, 0.08f, 0.06f, 0.04f, 0.02f, 0.01f, 0.008f, 0.006f,
            0.004f, 0.002f, 0.001f, 0.0006f, 0.0003f, 0.0f)

    private fun setupFadingTimer() {
        fadingTimer = timer(initialDelay = 300, period = 300, action = {
            if (fadingCurveIdx >= volumeCurve.count()) {
                jinglePlayer?.pause()
                jinglePlayer?.seekTo(0)
                jinglePlayer?.setVolume(1.0f, 1.0f)
                isFading = false
                fadingTimer?.cancel()
                fadingTimer = null
            }
            else {
                val volume = volumeCurve [fadingCurveIdx]
                fadingCurveIdx += 1
                jinglePlayer?.setVolume(volume, volume)
            }
        })
    }

    @ReactMethod
    fun fadeOutAndStopPlayer() {
        isFading = true
        fadingCurveIdx = 0
        setupFadingTimer()
    }

    @ReactMethod
    fun beep(times: Int) {
        var beepsLeft = times
        beepTimer = timer(initialDelay = 700, period = 700, action = {
            shortBeepPlayer = getPlayerForFile(shortBeepFile)
            shortBeepPlayer.seekTo(0)
            shortBeepPlayer.setVolume(1.0f, 1.0f)
            shortBeepPlayer.start()
            beepsLeft -= 1
            if (beepsLeft == 0) {
                beepTimer?.cancel()
                beepTimer = null
            }
        })
    }
}