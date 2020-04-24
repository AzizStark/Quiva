import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export class Help extends PureComponent {
  render() {
    return ( 
      <ScrollView style={cstyles.container}>

       <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()} onPress={() => this.props.navigation.navigate('Feedback') }>
        <View style={{height: 60, display: 'flex', flexDirection: 'row'}}>
            <Icon name="message-square" style={{ margin: 18, marginTop: 16, marginRight: 0 }} size={26} color="#7966FE" />
            <Text allowFontScaling = {false} style={{margin: 18,  fontSize: 18}}>Feedback</Text>
        </View>    
       </TouchableNativeFeedback>

       <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()} onPress={() => this.props.navigation.navigate('TandC') }>
        <View style={{height: 60, display: 'flex', flexDirection: 'row'}}>
            <Icon name="file-text" style={{ margin: 18, marginTop: 16, marginRight: 0 }} size={26} color="#7966FE" />
            <Text allowFontScaling = {false} style={{margin: 18, fontSize: 18}}>Terms and conditions</Text>
        </View>
       </TouchableNativeFeedback> 

       <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}  onPress={() => this.props.navigation.navigate('Privacy') }>
        <View style={{height: 60, display: 'flex', flexDirection: 'row'}}>
            <Icon name="lock" style={{ margin: 18, marginTop: 16, marginRight: 0 }} size={26} color="#7966FE" />
            <Text allowFontScaling = {false} style={{margin: 18, fontSize: 18}}>Privacy policy</Text>
        </View>
       </TouchableNativeFeedback>

      </ScrollView>
    );
  }
}

const cstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff' 
  },
})