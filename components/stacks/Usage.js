import React, { PureComponent } from 'react';
import { StyleSheet, Text, ScrollView} from 'react-native';
import styles from '../Styles';

export class Usage extends PureComponent {
  render() {
    return ( 
      <ScrollView style={cstyles.container}>

       <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 20, color: '#7966FE', paddingLeft: 6 }} > Styles </Text>
       <Text style={styles.content} >✦ Type the text in the text input box to generate text with multiple styles. </Text>
       <Text style={styles.content} >✦ Click on copy icon to copy the fancy text to clipboard to paste it anywhere you want. </Text>
       <Text style={styles.content} >✦ Click on share icon to share the fancy text to use it in other apps. </Text>
       <Text style={styles.content} >✦ Click any of the generated fancy text to open them in full view. </Text>

       <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 20, color: '#7966FE', paddingLeft: 6 }} > Decorator </Text>
       <Text style={styles.content} >✦ Type the text in the text input box to generate text with stylized words. </Text>
       <Text style={styles.content} >✦ Every typed words and letters gets styled with the symbols in start, middle and in the end.</Text>
       <Text style={styles.content} >✦ Choose the symbols that you want to use in the start, middle and in the end.</Text>
       <Text style={styles.content} >✦ Click on the generated the fancy text to open it in full view. </Text>
       <Text style={styles.content} >✦ You can enter custom symbols at the bottom to use symbols other than available symbols. </Text>

       <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 20, color: '#7966FE', paddingLeft: 6 }} > Title </Text>
       <Text style={styles.content} >✦ Type the text in the text input box. </Text>
       <Text style={styles.content} >✦ The sentence gets styled with the symbols in start and in the end.</Text>
       <Text style={styles.content} >✦ Choose the symbols that you want to use.</Text>
       <Text style={styles.content} >✦ New symbols will get added along with the old to create a design.</Text>
       <Text style={styles.content} >✦ Click on the generated the fancy text to open it in full view. </Text>
       <Text style={styles.content} >✦ You can enter custom symbols at the bottom of the fancy text preview.</Text>

       <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 20, color: '#7966FE', paddingLeft: 6 }} > Note </Text>
       <Text style={styles.content} >✦ The fancy text appearance differs from device to device. </Text>
       <Text style={styles.content} >✦ The first 20 fonts in styles are supported on Android 8 and above OS only.</Text>
       <Text style={styles.content} >✦ Text with too much characters can cause the app to lag.</Text>
       <Text style={[styles.content, { paddingBottom: 20}]} >✦ Some fancy text and symbols may or may not appear on other devices.</Text>

      </ScrollView>
    );
  }
}

const cstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff' 
  },
})