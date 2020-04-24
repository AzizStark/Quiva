import React, { PureComponent } from 'react';
import { Platform, Text, View, TextInput, SectionList, Alert, StatusBar, TouchableOpacity, Clipboard, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {About} from './components/stacks/About';
import {Privacy} from './components/stacks/Privacy';
import {TandC} from './components/stacks/T&C';
import {Usage} from './components/stacks/Usage';
import {Feedback} from './components/stacks/Feedback';
import {Help} from './components/stacks/Help';
import {Decor} from './components/Decor';
import {Title} from './components/Title';
import styles from './components/Styles';
import font from './components/data/fonts.json';
import { YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';

//########################################################### STATES ####################################################

export class Home extends PureComponent {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillReceiveProps is deprecated',
    ]);
 
    this.state = {
      modalVisible: false,
      modalContent: ['',0],
      andversion: '',
      inputdata: '',
      tarea: '', 
      icon: undefined,
      fontdata: [],
    };

    this.MyComponent = []
    
  }

  
  //####################################################  REMAP FUNCTION  ##############################################

  remap =  () => {

    let newtext = Array(36).fill("")

    const regText = this.state.inputdata || 'example';

    const normal = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

    const fontOrder = [24, 15, 26, 23, 14, 5, 4, 25, 0, 21, 22, 19, 18, 17, 16, 2, 20, 6, 3, 1, 27, 28, 7, 11, 10, 13, 8, 9, 12, 29, 30, 31, 32, 33, 34, 35];
    //The index refer [0,  1,  2,  3,  4,  5, 6, 7,  8,  9, 10, 11, 12, 13, 14, 15,16, 17,18,19,20, 21, 22,23, 24, 25, 26,27,28, 29, 30, 31, 32]
    
    // these are the characters to for newtext[29] to newtext[43]
    const otherChars = ['̲', '̶', '͙', '̟', '̃', '͎', '̺', '͆', '̳', '̈', '̾', '͓̽', '̸', '҉ ', '҈ ' ]
    const otherCharsNewText = Array(15).fill("")
    
    for (const char of regText) {  
        const indexed = normal.indexOf(char)
        
        if (indexed != -1) { 
          fontOrder.forEach((fontIndex, i) => {
            newtext[i] += font[fontIndex][indexed];
          });
        }  
        else {          
          for (let i = 0; i < 36; i++)
          newtext[i] += char
        }

        otherChars.forEach((symbol, i) => {
          if(char != " ")
            otherCharsNewText[i] += char + symbol;
          else
            otherCharsNewText[i] += char;
        }); 

    }

    newtext.splice(31, 0, ...otherCharsNewText);
    newtext[5] = newtext[5].split('').reverse().join('')
    
    // this.setState({fontdata: newtext})
    return newtext
  };

  //######################################################################## OTHER FUNCTIONS #####################################################

  _onPressButton = (item) => {
    if (item.value != "") {
      Clipboard.setString(item);
      Alert.alert("Text copied to clipboard");
    }
  }

  getListViewItem = (item, index) => {
    this.toModal = item
    this.toCopy = item
   
    this.setModalVisible(true);
    this.setState(function (state) {
      return { modalContent: [item, index] };
    });

  }

  setModalVisible(visible) {
    this.setState(function (state) {
      return { modalVisible: visible };
    });
  }

  _onPressButton2 = () => {

      Clipboard.setString(this.toCopy);      
      Alert.alert("Text copied to clipboard");

  }

  componentDidMount() {
    Icon.getImageSource('more-vertical', 24, '#ffffff').then((source) => {
      this.setState({ icon: source })
    })
    this.remap()
  }

  onActionSelected = (position) => {
    if (position === 0) { 
      this.props.navigation.navigate('Usage')
    }
    else if (position === 1) { 
      let title="Share Quiva with friends"
      let url = "https://github.com/AzizStark/Quiva"
      const options = Platform.select({
        default: {
          title: title, 
          message: `Hello, create fancy text with quiva \nDownload:\n ${url}`,
        },
      });
      Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
    }
    else if (position === 2) { 
      this.props.navigation.navigate('Help')
    }
    else if (position === 3) { 
      this.props.navigation.navigate('About')
    }
  }


  shareit = (ftext) =>{
    const options = Platform.select({
      default: {
        title: "Share your fancy text", 
        message: `${ftext}`,
      },
    });
    Share.open(options)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }

 
  writefancy = (mcontent) => {

    const normal = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
    const fontOrder = [24, 15, 26, 23, 14, 5, 4, 25, 0, 21, 22, 19, 18, 17, 16, 2, 20, 6, 3, 1, 27, 28, 7, 11, 10, 13, 8, 9, 12, 29, 30, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 31, 32, 33, 34, 35];
    //The index refer [0,  1,  2,  3,  4,  5, 6, 7,  8,  9, 10, 11, 12, 13, 14, 15,16, 17,18,19,20, 21, 22,23, 24, 25, 26,27,28, 29, 30, 31, 32]
    
    const otherChars = ['̲', '̶', '͙', '̟', '̃', '͎', '̺', '͆', '̳', '̈', '̾', '͓̽', '̸', '҉ ', '҈ ' ]

    const fontid = fontOrder[this.state.modalContent[1]]

    if(this.checktype){
      if(this.checktype === 'Backspace' && fontid === -2){
        mcontent = mcontent.slice(0, mcontent.length - 2)
      }
    }

    if( fontid === -2 ){
      mcontent = mcontent.split(otherChars[this.state.modalContent[1] - 31]).join("");
    }

    let newcontent = ""
    for (const char of mcontent) {  
        const indexed = normal.indexOf(char)
        
        if (indexed != -1 ) {
          if( fontid !== -2 ){
            newcontent += font[fontid][indexed];
          }
          else{
            newcontent += char + otherChars[this.state.modalContent[1] - 31]
          }
        }  
        else{        
            if(fontid != -2 || char == " "){
              newcontent += char
            }
            else{
              newcontent += char + otherChars[this.state.modalContent[1] - 31];
            }
        }
    }

    this.checktype = ""

    if(this.state.modalContent[1] === 5){
      newcontent.split('').reverse().join('')
    }

    try {
      this._MyComponent.setNativeProps({text: newcontent}); 
      this.toCopy = newcontent
    }
    
    catch{
      return newcontent
    }
  }

  //########################################################################## RENDER AREA ###########################################

  render() {
    const { modalVisible, modalContent } = this.state
    
    return (

      <View style={styles.container}>

        <StatusBar backgroundColor="#7966FE" barStyle="light-content" />

        {/*########################################################################### MODAL ###############################################*/}

        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={{ flex: 1, padding: 18, backgroundColor: "#ecf0f1" }}>
            <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible) }}>
              
              <Icon name="arrow-left" style={{ marginBottom: 10 }} size={28} color="#7966FE" />

            </TouchableOpacity>
            <ScrollView>
         
              <TextInput 
                onKeyPress = {
                  ({ nativeEvent }) =>
                  {
                    this.checktype = nativeEvent.key;
                  }
                }
  
                ref={component=> this._MyComponent=component} 
                defaultValue = {this.toModal} 

                onChangeText = {(mcontent) => { this.writefancy(mcontent) }} 
                
                style={{ fontSize: 20, width: wp('92%'), height: hp('78%'), textAlignVertical: "top",}} 
                multiline={true}>
              </TextInput>

            </ScrollView> 

            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>

              <TouchableOpacity onPress={() => this._onPressButton2()}>
                <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: '#7966FE' }}>
                  <Icon
                    name="copy"
                    style={{ margin: 16 }}
                    size={28}
                    title="Press Me"
                    color="#FFFFFF"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.shareit(this.toCopy)}>
                <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: '#7966FE' }}>
                  <Icon
                    name="share-2"
                    style={{ margin: 16 }}
                    size={28}
                    title="Press Me"
                    color="#FFFFFF"
                  />
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        {/*###################################################################### TOOL BAR ##############################################################*/}

          <ToolbarAndroid  
            style={styles.toolbar}
            logo={require('./logo.png')}
            onActionSelected={this.onActionSelected}
            overflowIcon = {this.state.icon}        
            actions={[
              { title: "How to use", show: "never", },{ title: "Share with friends", show: "never", }, { title: "Help", show: "never", },{ title: "About", show: "never", },
            ]}> 
          </ToolbarAndroid>
 

        {/*########################################################################## TEXT INPUT AREA ###########################################*/}

        <View style={styles.inputText}>
          <TextInput
            placeholder='Type Something'
            clearButtonMode="always"
            onChangeText={(inputdata) => { this.setState( {inputdata: inputdata} ) }}
            style={styles.Typeitem}
            multiline={true}
            value = {this.state.inputdata}
          />
          <TouchableOpacity>
            <Icon2 name="ios-backspace"  onPress={() => { this.setState({ inputdata: ""}) }} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
          </TouchableOpacity>  
        </View>
        
       <FlatList
          style={{ marginTop: 10 }} 

          data = { this.remap() }
          initialNumToRender={51}
          keyExtractor={( item, index) => 'key' + index}
          renderItem={({ item, index }) =>
            (
       
                <TouchableOpacity style={[styles.Listviu, styles.flatview]} onPress = {this.getListViewItem.bind(this, item, index)}>
                  
                  <Text numberOfLines={1}  ellipsizeMode="tail" style={styles.item}>
                    {item}
                  </Text>
  
                  <Icon name="copy" onPress={this._onPressButton.bind(this, item)} size={28} color="#7966FE" />

                  <Icon name="share-2" onPress={this.shareit.bind(this, item)} size={28}  style={{paddingLeft: 4}} color="#7966FE" />

                </TouchableOpacity>

            )
          }
        />
      </View>
    );

  }
}

//#######navigation tab bottom

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: <Text allowFontScaling = {false} style={{ fontFamily: 'Quicksand-Medium', fontSize: 12 }} > Styles </Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name='type' />
          </View>),
      }
    },

    Decorator: {
      screen: Decor,
      navigationOptions: {
        tabBarLabel: <Text allowFontScaling = {false} style={{ fontFamily: 'Quicksand-Medium', fontSize: 12  }}> Decorator </Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name='feather' />
          </View>),
      }
    },

    Titles: { 
      screen: Title,
      navigationOptions: {
        tabBarLabel: <Text allowFontScaling = {false} style={{ fontFamily: 'Quicksand-Medium', fontSize: 12  }}> Titles </Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name='pen-tool' />
          </View>),
      } 
    },

  },
  {
    initialRouteName: "Home",
    activeColor: '#7966FE',
    inactiveColor: '#ccafe0',
    barStyle: { backgroundColor: '#ffffff' },
  },
);


const AppNavigator = createStackNavigator({
  Tabs:{
    screen: TabNavigator,
    navigationOptions: {
      title: 'Home',
      header: null
    },
  },
  Usage: { 
    screen: Usage,  
    navigationOptions: {
      title: 'How to use',    
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  },
  Privacy: { 
    screen: Privacy,
    navigationOptions: {
      title: 'Privacy policy',  
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  }, 
  TandC: { 
    screen: TandC,
    navigationOptions: {
      title: 'Terms and conditions',  
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  }, 
  Help: { 
    screen: Help,
    navigationOptions: {
      title: 'Help',  
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  }, 
  About: { 
    screen: About,
    navigationOptions: {
      title: 'About',  
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  }, 
  Feedback: { 
    screen: Feedback,  
    navigationOptions: {
      title: 'Feedback',    
      headerStyle: {
        backgroundColor: '#7966FE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontFamily: 'Quicksand-Medium'
      },
    }
  },
}
);


export default createAppContainer(AppNavigator);

