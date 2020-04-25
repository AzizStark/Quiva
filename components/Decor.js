import React, { PureComponent } from 'react';
import { Picker, Text, View, FlatList, TextInput, Alert, StatusBar, TouchableOpacity, Clipboard, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from "react-native-segmented-control-tab";
import styles from './Styles';
import glyphs from './data/glyphs.json';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import Share from 'react-native-share';

export class Decor extends PureComponent {

  constructor(props) {
    super(props); 
    this.state = {
      modalVisible: false,
      modalContent: "",
      inputdata2: '',
      tarea: '',
      category1: 'Brackets',
      category2: 'Brackets',
      category3: 'Brackets',
      customStyleIndex: 0,
      selected1: '',
      selected2: '',
      selected3: '',
      flist1: '0',
      flist2: '0',
      flist3: '0',
      fdata1: '【',
      fdata2: '',
      fdata3: '】',
      dataSource1: glyphs.Brackets[0],
      dataSource2: glyphs.Brackets[1],
      dataSource3: glyphs.Brackets[2],
      icon: undefined
    };  
  }

  remap2 = () => {
    let [...regText] = this.state.inputdata2 || 'example'
    let newText = ``
    let anormal = [' ', '̷', '̶', '҉', '҈', '̃', '̸', '̳', '̈', '】', '┋', '【', '〗', '〖', '╝', '╚', '͆', '̾',]

    for (var i = 0; i < regText.length; i++) {
      let sliced = regText.slice(i, i + 1) 

      if (i == 0 || !(anormal.includes(sliced)) && regText[i - 1] == ' ' || !(anormal.includes(sliced)) && regText[i - 1] == '\n') {
        if (regText[i + 1] == ' ' || regText[i + 1] == undefined || regText[i + 1] == '\n') {
          if (sliced == '\n') {
            newText = newText + '\n'
          }
          else if (sliced != ' ') {
            newText = newText + `${this.state.fdata1}` + sliced + `${this.state.fdata3}`
          }
          else{
            newText = newText + ' '
          }
        }
        else {
          if (sliced == '\n') {
            newText = newText + '\n'
          }
          else if (sliced == ' ') {
            newText = newText + ' '
          }
          else {
            newText = newText + `${this.state.fdata1}` + sliced
          }
        }
      }
      else if (i + 1 == regText.length && regText[i] != ' ' || regText[i + 1] == ' ' && regText[i] != ' ' || i + 1 == regText.length && regText[i] != '\n' || regText[i + 1] == '\n' && regText[i] != '\n') {
        if (sliced == '\n') {
          newText = newText + '\n'
        }
        else if (regText[i] != ' ') {
          if (anormal.includes(sliced)) {
            newText = newText + sliced + `${this.state.fdata3}`
          }
          else {
            newText = newText + `${this.state.fdata2}` + sliced + `${this.state.fdata3}`
          }
        }
      }
      else if (sliced != ' ' && sliced != '\n' && !anormal.includes(sliced)) {
        newText = newText + `${this.state.fdata2}` + sliced
      }
      else {
        newText = newText + sliced
      }
    }
    return newText
  }


  //handle tab selection for custom Tab Selection SegmentedControlTab
  handleCustomIndexSelect = (index) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };


  setModalVisible(visible) {
    this.setState({ modalVisible: visible, modalContent: this.remap2() });
  }


  copyText = (text) => {
      Clipboard.setString(text);
      Alert.alert("Text copied to clipboard");
  }


  _onPressButton = ({ index }, { item }) => {

    if (`${this.state.customStyleIndex}` === '0') {
      if (`${this.state.flist1}` != index) {
        this.setState({ flist1: index, fdata1: item, selected1: this.state.category1 })
      }
      else {
        this.setState({ flist1: undefined, fdata1: '', selected1: '' })
      }
    }

    else if (`${this.state.customStyleIndex}` === '1') {
      if (`${this.state.flist2}` != index) {
        this.setState({ flist2: index, fdata2: item, selected2: this.state.category2 })
      }
      else {
        this.setState({ flist2: undefined, fdata2: '', selected2: '' })
      }
    }

    else {
      if (`${this.state.flist3}` != index) {
        this.setState({ flist3: index, fdata3: item, selected3: this.state.category3 })
      }
      else {
        this.setState({ flist3: undefined, fdata3: '', selected3: '' })
      }
    }

    setTimeout(this.remap2, 1)
  }


  pickerSelect = (value) => {

    if (`${this.state.customStyleIndex}` == 0) {
      this.setState({ category1: value, dataSource1: glyphs[value][`${this.state.customStyleIndex}`] })
    }
    else if(`${this.state.customStyleIndex}` == 1) {
      this.setState({ category2: value, dataSource2: glyphs[value][`${this.state.customStyleIndex}`] })
    }
    else{
      this.setState({ category3: value, dataSource3: glyphs[value][`${this.state.customStyleIndex}`] })
    }

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

  componentDidMount() {
    Icon.getImageSource('more-vertical', 24, '#ffffff').then((source) => {
      this.setState({ icon: source })
    })
  }

  render() {
    const { customStyleIndex, modalContent } = this.state;

    return (
      <View style={styles.container}>

      <StatusBar backgroundColor="#7966FE" barStyle="light-content" />

        {/*########################################################################### MODAL ###############################################*/}

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{ flex: 1, padding: 18, backgroundColor: "#ecf0f1" }}>
            <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
              <Icon name="arrow-left" style={{ marginBottom: 10 }} size={28} color="#7966FE" />
            </TouchableOpacity>
            <ScrollView>
              <TextInput  ellipsizeMode = "head" style={styles.modelinputtext}  onChangeText = {(modalContent) => this.setState({modalContent})} multiline={true}>{modalContent}</TextInput>
            </ScrollView>
            
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>

              <TouchableOpacity onPress={() => this.copyText(modalContent)}>
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

              <TouchableOpacity onPress={() => this.shareit(this.state.modalContent)}>
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
            logo={require('../logo.png')}  
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
            onChangeText={(inputdata2) => { this.setState({ inputdata2, tarea: inputdata2 })}}
            multiline={true}
            style={styles.Typeitem}
            value={this.state.tarea}
          /> 
          <TouchableOpacity>
            <Icon2 name="ios-backspace" onPress={(inputdata2) => { this.setState({ inputdata2: "An example text", tarea: "" }); setTimeout(this.remap2, 1) }} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
          </TouchableOpacity>
        </View>
        
 
         <TouchableOpacity style={[styles.Listviu, styles.flatview]} onPress={() => this.setModalVisible(true)}>
            <Text numberOfLines={1} ellipsizeMode="head" style={styles.item}>
              {this.remap2()}
            </Text> 
            <TouchableOpacity onPress={() => this.copyText(this.remap2())}>
              <Icon name="copy" size={28} color="#7966FE" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.shareit(this.remap2())} style={{paddingLeft: 4}}>
              <Icon name="share-2" size={28} color="#7966FE" />
            </TouchableOpacity>
        </TouchableOpacity>


        {/*############################################ Decorati tool ############################################## */}

        <View style={{ flex: 1, margin: 6, marginBottom: 0, marginTop: 0 }}>
          <SegmentedControlTab
            values={['Start', 'Middle', 'End']}
            selectedIndex={customStyleIndex}
            allowFontScaling = {false}
            onTabPress={this.handleCustomIndexSelect}
            borderTopRightRadius={6}
            tabsContainerStyle={{ height: 47, backgroundColor: 'white', borderRadius: 6 }}

            tabStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderColor: 'transparent',
            }}

            activeTabStyle={{ backgroundColor: '#7966FE', borderRadius: 6, width: 20 }}
            tabTextStyle={{ color: '#444444', fontFamily: 'Quicksand-Medium', fontSize: 16, textAlignVertical: 'center' }}
            activeTabTextStyle={{ color: '#FFFFFF' }}
          />

          <View style={{ flex: 1, backgroundColor: '#7966FE', borderRadius: 6, marginTop: 8, padding: 4 }}>
            <View style={{ height: 46, backgroundColor: '#FFFFFF', borderRadius: 6, margin: 4, marginBottom: 8, fontSize: 20, }}  allowFontScaling = {false}>
              <Picker
                selectedValue={(customStyleIndex == 0) ? this.state.category1 : ((customStyleIndex == 1) ? this.state.category2 : ((customStyleIndex == 2) ? this.state.category3 : this.state.category3))}
                onValueChange={(itemValue) => { this.pickerSelect(itemValue) }}  >
               
                <Picker.Item label="Brackets" value="Brackets" />
                <Picker.Item label="Stars & Flowers" value="Stars" />
                <Picker.Item label="Arrows" value="Arrows" />
                <Picker.Item label="Chess" value="Chess" />
                <Picker.Item label="Hearts" value="Hearts" />
                <Picker.Item label="Triangles" value="Triangles" />
                <Picker.Item label="Corners" value="Corners" />
                <Picker.Item label="Circles" value="Circles" />
                <Picker.Item label="Squares" value="Squares" />
                <Picker.Item label="Lines" value="Lines" />
              </Picker>  
            </View>    
 
            <FlatList
              data={(customStyleIndex == 0) ? this.state.dataSource1 : ((customStyleIndex == 1) ? this.state.dataSource2 : ((customStyleIndex == 2) ? this.state.dataSource3 : this.state.dataSource3))}
              // initialNumToRender={10}
              // maxToRenderPerBatch={10}
              removeClippedSubviews={true}
              contentContainerStyle={{ justifyContent: 'center' }}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={(this.state.flist1 === index && customStyleIndex === 0 && this.state.selected1 === this.state.category1 ) ? styles.flatview2TIC : ((this.state.flist2 === index && customStyleIndex === 1 && this.state.selected2 === this.state.category2 ) ? styles.flatview2TIC : ((this.state.flist3 === index && customStyleIndex === 2 && this.state.selected3 === this.state.category3 ) ? styles.flatview2TIC : styles.flatview2))}
                  onPress={this._onPressButton.bind(this, { index }, { item })}  >
                  <Text allowFontScaling = {false} style={styles.textstyle2}> {item} </Text>
                  <Text  allowFontScaling = {false} style={{ margin: 0,fontSize: 12, paddingTop: 1, marginLeft: 2, color: '#244E53' }}>{index}</Text>
                </TouchableOpacity>
              )}
              //Setting the number of column
              numColumns={5}
              keyExtractor={(item, index) => index}
            />

          </View>
         
          <Text allowFontScaling = {false} style={{ fontFamily: 'Quicksand-Medium', fontSize: 16, textAlign: 'center', color: '#7966FE', }}> ↫ Enter custom symbols ↬</Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput
                  placeholder='Start'
                  clearButtonMode="always"
                  onChangeText={(inputdata) => { this.setState({fdata1: inputdata }); setTimeout(this.remap2, 1) }}
                  style={styles.inputText2}
                  value={this.state.fdata1}
            />
            <TextInput
                  placeholder='Middle'
                  clearButtonMode="always"
                  onChangeText={(inputdata) => { this.setState({ fdata2: inputdata }); setTimeout(this.remap2, 1) }}
                  style={styles.inputText2}
                  value={this.state.fdata2}
            />
            <TextInput 
                  placeholder='End'
                  clearButtonMode="always"
                  onChangeText={(inputdata) => { this.setState({ fdata3: inputdata }); setTimeout(this.remap2, 1) }}
                  style={styles.inputText2} 
                  value={this.state.fdata3}
            />
          </View>

        </View>
      </View>
    );
  }
}   
 