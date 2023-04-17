import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, SafeAreaView, Keyboard, View} from 'react-native';
import { WebView } from 'react-native-webview';
import AddrForm from './components/AddrForm.js';
// import { usb } from 'usb';
import htm from './src/index.html';

export default function App() {
  const [content, setContent] = useState("");
  const [addr, setAddr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  //const appState = useRef(AppState.currentState);
  // useEffect(() => {
  //   const appStateListen = AppState.addEventListener('change', nextAppState => {
  //       if(nextAppState != 'active') {
  //         socket.disconnect();
  //         console.log("client disconnected - app left")
  //       }
  //     })
  // })

  const submit = async () => {
    if (submitted) return;
    setSubmitted(true);
    Keyboard.dismiss();
    setContent(String(htm).replace("ADDR_PLACEHOLDER", addr+":3001"));
    console.log(`ip: ${addr}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AddrForm setAddr={setAddr} submit={submit}/>
      <WebView style={styles.web} scalesPageToFit={false} useWebKit={false} scrollEnabled={false} source={{ html: `${content}` }}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  web: {
    justifyContent: 'center',
    width: 320,
    height: 300
  }
});