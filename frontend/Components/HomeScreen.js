import React from 'react';
import {Text, View,ImageBackground} from 'react-native';

export default class HomeScreen extends React.Component {

    render() {

      return (
  
        <ImageBackground source={require('../assets/people.jpg')} style={{width: '100%', height: '100%'}}>
  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              
              <View style={{
                alignItems: 'center',
                justifyContent: 'center', 
                width: '60%',
                height: '10%',
                backgroundColor:'#022F40',
                border: 'solid',
                borderColor:'white',
                borderWidth: 3,
                borderRadius: 30,
                }}>
  
                  <Text style={{
                    color:'#FFFFFF',
                    fontStyle:'italic',
                    fontWeight:'bold',
                    fontSize:30
                  }}>Face Up!
                  </Text>
  
              </View>
  
            </View>
  
        </ImageBackground>
        
      );
    }
  }