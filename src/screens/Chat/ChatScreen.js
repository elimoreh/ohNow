/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  findNodeHandle,
  NativeEventEmitter,
  NativeModules,
  UIManager,
  DeviceEventEmitter
} from 'react-native';
import AgoraRtcEngine from '../../../components/AgoraRtcEngineModule';
import AgoraRendererView from '../../../components/AgoraRendererView';

const agoraKitEmitter = new NativeEventEmitter(AgoraRtcEngine);
var isSpeakerPhone = false;
//provide this url if you want rtmp relevant features
var cdn_url = "YOUR_CDN_URL"

export default class ChatScreen extends Component {
  state = {
    localStream: null,
    remoteStreams: []
  }
  viewRegistry = {}
  listeners = []

  componentDidMount() {
    this.registerCallbacks();
    AgoraRtcEngine.createEngine("54bc6c45d47c4f8eb415436e96e79490");

    AgoraRtcEngine.enableVideo();
    AgoraRtcEngine.enableAudio();
    AgoraRtcEngine.setVideoProfileDetail(360, 640, 15, 300);
  }

  componentDidUpdate() {
    //the view registry could be changed after render update
    //resetup remote views here
    let remoteStreams = this.state.remoteStreams || [];
    for (let i = 0; i < remoteStreams.length; i++) {
      let stream = remoteStreams[i];
      let { uid } = stream;
      AgoraRtcEngine.setRemoteVideoView(this.viewRegistry[uid], uid, AgoraRtcEngine.AgoraVideoRenderModeFit)
    }
  }

  // Agora Action 
  _joinChannel() {
    AgoraRtcEngine.setLocalVideoView(this.viewRegistry["local"], AgoraRtcEngine.AgoraVideoRenderModeFit);
    AgoraRtcEngine.setChannelProfile(1);
    AgoraRtcEngine.setClientRole(1);
    AgoraRtcEngine.setVideoProfile(AgoraRtcEngine.AgoraVideoProfileDEFAULT, true);
    AgoraRtcEngine.startPreview();
    AgoraRtcEngine.joinChannel("54bc6c45d47c4f8eb415436e96e79490", "rnchannel01", "React Native for Agora RTC SDK", 0);
  }

  _leaveChannel() {
    AgoraRtcEngine.stopPreview();
    AgoraRtcEngine.leaveChannel();
  }

  _switchCamera() {
    AgoraRtcEngine.switchCamera();
  }

  _switchAudio() {
    AgoraRtcEngine.setEnableSpeakerphone(isSpeakerPhone);
    isSpeakerPhone = !isSpeakerPhone;
  }

  render() {
    let remoteViews = this.state.remoteStreams.map(stream => {
      let { uid } = stream;
      return (
        <AgoraRendererView
          ref={component => this.viewRegistry[uid] = component}
          key={uid}
          style={{ width: 360, height: 240 }}
        />
      )
    })
    return (
      <View style={styles.container} >

        <AgoraRendererView key="local"
          ref={component => this.viewRegistry["local"] = component}
          style={{ width: 360, height: 240 }}
        />
        {remoteViews}
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ flex: 1 }}
            onPress={this._joinChannel.bind(this)}
            title="Join Channel"
            style={{ width: 180, float: "left", backgroundColor: "rgb(0,0,0)" }}
            color="#841584"
          />
          <Button style={{ flex: 1 }}
            onPress={this._leaveChannel.bind(this)}
            title="Leave Channel"
            color="#841584"
            style={{ width: 180, float: "left" }}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={this._switchCamera.bind(this)}
            title="Switch Camera"
            color="#841584"
          />
        </View>
      </View>
    );
  }

  registerCallbacks() {
    let listeners = this.listeners || [];
    // Aogra CallBack
    listeners.push(agoraKitEmitter.addListener(
      'RemoteDidJoinedChannel',
      (notify) => {
        //update state
        let remoteStreams = this.state.remoteStreams || [];
        remoteStreams.push({ uid: notify.uid })
        this.setState({ remoteStreams })
      }
    ));

    listeners.push(agoraKitEmitter.addListener(
      'RemoteDidOfflineOfUid',
      (notify) => {
        //remove stream and update state
        let remoteStreams = this.state.remoteStreams || [];
        remoteStreams = remoteStreams.filter(s => s.uid !== notify.uid)
        this.setState({ remoteStreams })
      }
    ));

    listeners.push(agoraKitEmitter.addListener(
      'StreamPublished',
      (notify) => {
        console.log(`stream published ${notify.errorCode}`)
      }
    ));

    listeners.push(agoraKitEmitter.addListener(
      'StreamUnpublished',
      (notify) => {
        console.log(`stream unpublished`)
      }
    ));
  }

  componentWillUnmount() {
    this.listeners.forEach(i => i.remove())
  }

}

ChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});