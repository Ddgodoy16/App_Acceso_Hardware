import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { Grabar } from './GrabarAudio'; 

export function Reproducir() {
  const [sound, setSound] = useState();
  const recordingURI = Grabar.recordingURI; 

  async function playSound() {
    console.log('Cargando sonido...');
    const { sound } = await Audio.Sound.createAsync(recordingURI);
    setSound(sound);

    console.log('Reproduciendo sonido...');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Descargando sonido...');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Reproducir sonido" onPress={playSound} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
