package com.jinglify

import android.view.View
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import java.util.*



/**
 * Created by qisoft on 09/05/2017.
 */
class AudioPlayerModulePackage : ReactPackage {

    override fun createJSModules(): List<Class<out JavaScriptModule>> {
        return Collections.emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<View, ReactShadowNode>> {
        return Collections.emptyList()
    }

    override fun createNativeModules(
            reactContext: ReactApplicationContext): List<NativeModule> {
        val modules = ArrayList<NativeModule>()

        modules.add(AudioPlayerModule(reactContext))

        return modules
    }

}