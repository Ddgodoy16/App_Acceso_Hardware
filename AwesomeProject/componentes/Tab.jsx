

import Icon from 'react-native-vector-icons/Ionicons'


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Grabar } from './pantallas/GrabarAudio';
import { Reproducir } from './pantallas/Reproductor';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>{
            let nombreIcono

            switch (route.name) {
                case 'Grabar':
                    nombreIcono = focused ? "play" : "play-outline"
                    break;

               
            
                default:
                    nombreIcono = focused ? "play" : "play-outline"
                    break;
            }
            return <Icon name={nombreIcono} size={size} color={color} />
        }
    })}>
                <Tab.Screen name="Grabar" component={Grabar} />
                <Tab.Screen name="Reproductor" component={Reproducir} />
                 </Tab.Navigator>
}