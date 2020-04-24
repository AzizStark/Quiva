import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';

export class About extends PureComponent {
  render() {
    return ( 
      <View style={cstyles.container}>
       <Image style={{width: 160, height: 160}} source={require(`./Quiva.png`)} />
       <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 24, color: '#7966FE'}} >Quiva</Text>
       <Text  style={{color: '#333'}}>Version 1.0.1</Text>
       <Text style={{color: 'blue'}}  
        onPress={() => Linking.openURL('https://github.com/AzizStark/Quiva')}>
        Website
      </Text>
      </View>
    );
  }
}

const cstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})