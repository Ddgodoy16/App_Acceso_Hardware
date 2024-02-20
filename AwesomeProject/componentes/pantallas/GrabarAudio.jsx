import React, { useState, useEffect } from 'react';
import { View, Button, ProgressViewIOS, ProgressBarAndroid, Platform, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export function Grabar() {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingURI, setRecordingURI] = useState(null); // Almacenar la URI para acceder más tarde

  useEffect(() => {
    if (recording) {
      recording.setOnRecordingStatusUpdate(null);
    }
  }, []);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        console.log('Permiso denegado');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Iniciando grabación...');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);
      console.log('Grabación iniciada');

      recording.setOnRecordingStatusUpdate(status => {
        setIsRecording(status.isRecording);
      });
    } catch (err) {
      console.error('Error al iniciar la grabación', err);
    }
  }

  async function stopRecording() {
    console.log('Deteniendo grabación...');
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecordingURI(uri); // Almacenar la URI
    console.log('Grabación detenida y almacenada en', uri);
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>{isRecording ? 'Grabando...' : 'No grabando'}</Text>
      {Platform.OS === 'ios' ? (
        <ProgressViewIOS
          progressTintColor="#007AFF"
          progress={isRecording ? undefined : 0}
          style={{ width: 200 }}
        />
      ) : (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={!isRecording}
          progress={!isRecording ? 0 : undefined}
          color="#007AFF"
          style={{ width: 200 }}
        />
      )}
      <Button
        title={isRecording ? 'Detener Grabación' : 'Comenzar Grabación'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
  },
});
