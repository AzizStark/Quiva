import React, { PureComponent } from 'react';
import { Text, View, FlatList, TextInput, Alert, TouchableOpacity, StatusBar,Clipboard, Modal, AsyncStorage,  TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import styles from './Styles';
import symbols from './data/titles.json';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import Share from 'react-native-share';

export class Title extends PureComponent {


    constructor(props) {
        super(props); 
        this.state = {
            modalVisible: false,
            modalContent: '',
            inputdata: '',
            symbols: '',
            tarea: 'example',
            prefix: "",
            icon: undefined,
        }
        this.pvarb = ""
        this.initialinput = ""
    }

    remap = () => {
        const strings = this.initialinput || '★ example ★'
        let symbols = this.pvarb || ""
        let suffix = [...symbols].reverse().join``
        let newtext = symbols + strings + suffix
        this._MyComponent.setNativeProps({text: newtext}); 
        this.copydata = newtext
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible });
    }

    copyText = () => {
          Clipboard.setString(this.copydata);
          Alert.alert("Text copied to clipboard");
    }

    _onPressButton2 = () => {
        if (this.state.modalContent != "") {
            Clipboard.setString(this.state.modalContent);
            Alert.alert("Text copied to clipboard");
        }
    }

    shareit = () =>{
        const options = Platform.select({
          default: {
            title: "Share your fancy text", 
            message: `${this.copydata}`,
          },
        });
        Share.open(options)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
    }    



    renderItem = ({ item }) => (
        <TouchableHighlight underlayColor={'#ecf0f1'} style={styles.flatview} onPress={this.getListViewItem.bind(this, item)}>
            <View style={styles.Listviu}>
                <Text numberOfLines={1} ellipsizeMode="head" style={styles.item}>
                    {item}
                </Text>
                <TouchableOpacity>
                    <Icon name="copy" size={28} color="#7966FE" />
                </TouchableOpacity>
            </View>
        </TouchableHighlight>
    );

    
      componentDidMount() {
        Icon.getImageSource('more-vertical', 24, '#ffffff').then((source) => {
          this.setState({ icon: source })
        })
        AsyncStorage.getItem("styletext3").then((value) => {
            const text = value 
            AsyncStorage.getItem("styletext4").then((value) => { 
                this.pvarb = value || ""
                this.initialinput = text 
                this.setState({inputdata: text, symbols: value})
                this.remap() 
            }).catch( () => {
                this.remap() 
            })
        }).catch( () => { this.remap() })
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

  
  saveContent = (key, content) => {
    AsyncStorage.setItem(key, content)
  }

  deleteContent = (key) => {
    AsyncStorage.removeItem(key);
  }
  
    render() {
        const { modalVisible, modalContent } = this.state
        return ( 

            <View style={styles.container}>

                {/*########################################################################### MODAL ###############################################*/}
                <StatusBar backgroundColor="#7966FE" barStyle="light-content" />
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
                        <ScrollView onTouchStart = {() => {Alert.alert("Text cannot be edited here.") }} >
                            <Text
                                ellipsizeMode = "head" 
                                style={styles.modelinputtext}  
                            >{this.copydata}
                            </Text>
                        </ScrollView>

                        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>

                            <TouchableOpacity  onPress={this.copyText}>
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

                            <TouchableOpacity onPress={() => this.shareit()}>
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

                <ToolbarAndroid  
                    style={styles.toolbar}
                    logo={require('../logo.png')}  
                    onActionSelected={this.onActionSelected}
                    overflowIcon = {this.state.icon}        
                    actions={[
                        { title: "How to use", show: "never", },{ title: "Share with friends", show: "never", }, { title: "Help", show: "never", },{ title: "About", show: "never", },
                    ]}>  
                </ToolbarAndroid>

                <View style={styles.inputText}>
                    <TextInput
                        placeholder='Type Something'
                        clearButtonMode="always"
                        onChangeText={(input) => {this.initialinput = input; this.remap(), this.saveContent('styletext3', input) }}
                        style={styles.Typeitem}
                        ref={component=> this.initinput = component}
                        defaultValue = {this.state.inputdata}
                    />
                    <TouchableOpacity>   
                        <Icon2 name="ios-backspace" onPress={() => { this.initialinput = ""; this.remap(); this.initinput.setNativeProps({text: ""}, this.deleteContent('styletext3') )}} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
                    </TouchableOpacity>  
                </View>
 
              
                <TouchableOpacity style={[styles.Listviu, styles.flatview]}  onPress={() => this.setModalVisible(true)}>
                    <TextInput numberOfLines={1} ellipsizeMode="head" style={styles.item}  ref={component=> this._MyComponent=component} editable = {false} > </TextInput>
                    <TouchableOpacity onPress={this.copyText}>
                        <Icon name="copy" size={28} color="#7966FE" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.shareit()} style={{paddingLeft: 4}}>
                        <Icon name="share-2" size={28} color="#7966FE" />
                    </TouchableOpacity>
                </TouchableOpacity>


                <View style={[styles.inputText,{ marginTop: 0, marginBottom: 0}]}>
                    <TextInput
                        placeholder='Enter symbols'
                        clearButtonMode="always"
                        onChangeText={(inputdata) => { this.pvarb = inputdata; this.remap(), this.saveContent( 'styletext4', inputdata) }}
                        style={styles.Typeitem} 
                        ref={component=> this._MyComponent2 = component}
                        defaultValue = {this.state.symbols}
                    />  
                    <TouchableOpacity>
                        <Icon2 name="ios-backspace" onPress={() => { this.pvarb = ""; this._MyComponent2.setNativeProps({text: ""}, this.deleteContent('styletext4')); this.remap(); }} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, backgroundColor: '#7966FE', borderRadius: 6, margin: 8, padding: 4 }}>

                    <FlatList
                        data={symbols.Symbols}
                        removeClippedSubviews={true}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={(this.state.flist1 === index && customStyleIndex === 0 && this.state.selected1 === this.state.category1) ? styles.flatview2TIC : ((this.state.flist2 === index && customStyleIndex === 1 && this.state.selected2 === this.state.category2) ? styles.flatview2TIC : ((this.state.flist3 === index && customStyleIndex === 2 && this.state.selected3 === this.state.category3) ? styles.flatview2TIC : styles.flatview2))}
                            onPress={() => {this.pvarb = this.pvarb + item; this._MyComponent2.setNativeProps({text: this.pvarb}); this.remap(); this.saveContent( 'styletext4', this.pvarb )   }}>            
                                <Text allowFontScaling = {false} style={styles.textstyle2}> {item} </Text>
                                <Text allowFontScaling = {false} style={{ margin: 0, fontSize: 10, paddingTop: 1, marginLeft: 2, color: '#244E53' }}>{index}</Text>
                            </TouchableOpacity>
                        )}
                        //Setting the number of column
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                    />

                </View>

            </View>
        )
    }
}