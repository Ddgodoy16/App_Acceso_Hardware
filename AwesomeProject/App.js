import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import { Tabs } from './componentes/Tab';


export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Tabs></Tabs> 
    </NavigationContainer>
  </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    marginLeft: 12,
    marginRight: 12
  }
});

