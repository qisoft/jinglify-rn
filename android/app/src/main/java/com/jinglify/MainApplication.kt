package com.jinglify

import android.app.Application

import com.facebook.react.ReactApplication
import com.corbt.keepawake.KCKeepAwakePackage
import com.cmcewen.blurview.BlurViewPackage
import com.i18n.reactnativei18n.ReactNativeI18n
import com.learnium.RNDeviceInfo.RNDeviceInfo
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

import java.util.Arrays

class MainApplication : Application(), ReactApplication {
    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            return Arrays.asList(
                    MainReactPackage(),
                    KCKeepAwakePackage(),
                    BlurViewPackage(),
                    ReactNativeI18n(),
                    RNDeviceInfo(),
                    ReactNativeConfigPackage(),
                    AudioPlayerModulePackage()
            )
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, /* native exopackage */ false)
    }
}
