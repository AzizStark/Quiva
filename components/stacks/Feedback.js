import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Linking, TextInput, TouchableNativeFeedback } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styles from '../Styles';

export class Feedback extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
          title: false,
          body: '',
          andversion: '',
        };
      }
    
      
  _getAndroidVersion = () => {
    if (Platform.Version === 21 || Platform.Version === 22) {
      return 'Lollipop'
    }
    else if (Platform.Version === 23) {
      return 'Marshmallo'
    }
    else if (Platform.Version === 24 || Platform.Version === 25) {
      return 'Nougat'
    }
    else if (Platform.Version === 26 || Platform.Version === 27) {
      return 'Oreo'
    }
    else if (Platform.Version === 28) {
      return 'Pie'
    }
    else if (Platform.Version === 29) {
      return 'Q'
    } 
    else {
      return 'UNKNOWN'
    }
  }

    sendmail = () => {
      Linking.openURL(`mailto:theazizstark@gmail.com?subject=[QUIVA] ${this.state.title}&body=${this.state.body}\n API Version: ${Platform.Version} \n Android: ${this._getAndroidVersion()}`) 
      title="support@example.com"
    }

  render() {
    return ( 
      <View style={cstyles.container}>
        
        <Text
          style={{padding: 8,fontFamily: 'Quicksand-Medium', fontSize: 16, color: '#7966FE', paddingLeft: 6, width: wp('100'), alignSelf: 'center', textAlign: 'center' }}
          > Send feedback, suggestions or report an issue </Text>
   
        <TextInput
          style={[styles.Typeitem, { backgroundColor: '#fff', borderRadius: 6, width: wp('94')}]}
          placeholder="Enter title"
          onChangeText={(text) => this.setState({title: text})}
        />

        <TextInput
          style={[styles.Typeitem, {width: wp('94'), backgroundColor: '#fff', borderRadius: 6, height: hp('30') ,paddingTop: 16, textAlignVertical: 'top'}]}
          placeholder="Enter message"
          multiline = {true}
          onChangeText={(text) => this.setState({body: text})}
        />

        <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()} onPress={this.sendmail}>
            <View style={{marginTop: 8, height: 50, display: 'flex', flexDirection: 'row', width: wp('94'), backgroundColor: '#7966FE', borderRadius: 6 }}>
                <Text style={{height: 50, textAlignVertical: 'center' ,width: wp('94'),  fontSize: 18, textAlign: 'center', color: '#fff'}}>Send</Text>
            </View>    
       </TouchableNativeFeedback>

      </View>
    );
  }
}

const cstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#F3F2F7'
  },
})