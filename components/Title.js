import React, { PureComponent } from 'react';
import { Text, View, FlatList, TextInput, Alert, TouchableOpacity, StatusBar,Clipboard, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
            tarea: 'example',
            prefix: '',
            icon: undefined
        }
    }

    remap = () => {
        let strings = this.state.inputdata || 'example'
        let suffix = [...this.state.prefix].reverse().join``
        let newtext = this.state.prefix + strings + suffix
        return newtext
    }

    setModalVisible(visible) {
        this.setState(function (state) {
            return { modalVisible: visible, modalContent: this.remap() };
        });
    }

    copyText = () => {
          Clipboard.setString(this.remap());
          Alert.alert("Text copied to clipboard");
    }

    _onPressButton2 = () => {
        if (this.state.modalContent != "") {
            Clipboard.setString(this.state.modalContent);
            Alert.alert("Text copied to clipboard");
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
                        <ScrollView>
                            <TextInput  ellipsizeMode = "head" style={{ fontSize: 20, width: wp('92%'), height: hp('78%'), textAlignVertical: "top",}}  onChangeText = {(modalContent) => this.setState({modalContent})} multiline={true}>{this.state.modalContent}</TextInput>
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

                            <TouchableOpacity onPress={() => this.shareit(modalContent)}>
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
                        onChangeText={(input) => { this.setState({ inputdata: input });}}
                        style={styles.Typeitem}
                        multiline={true}
                        value={this.state.inputdata}
                    />
                    <TouchableOpacity>   
                        <Icon2 name="ios-backspace" onPress={(inputdata) => { this.setState({ inputdata: "", tarea: "example" }); setTimeout(this.remap, 1) }} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
                    </TouchableOpacity>  
                </View>
 
              
                <TouchableHighlight underlayColor={'#ecf0f1'} style={styles.flatview} onPress={() => this.setModalVisible(true)}>
                    <View style={styles.Listviu}>
                        <Text numberOfLines={1} ellipsizeMode="head" style={styles.item}>
                            {this.remap()}
                        </Text>
                        <TouchableOpacity onPress={this.copyText}>
                            <Icon name="copy" size={28} color="#7966FE" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.shareit(this.remap())} style={{paddingLeft: 4}}>
                            <Icon name="share-2" size={28} color="#7966FE" />
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>


                <View style={[styles.inputText,{ marginTop: 0, marginBottom: 0}]}>
                    <TextInput
                        placeholder='Enter symbols'
                        clearButtonMode="always"
                        onChangeText={(inputdata) => { this.setState({ prefix: inputdata }) }}
                        style={styles.Typeitem} 
                        value={this.state.prefix}
                    />
                    <TouchableOpacity>
                        <Icon2 name="ios-backspace" onPress={(inputdata) => { this.setState({ tarea: "example", prefix: "" }); setTimeout(this.remap, 1) }} style={{ paddingRight: 10, }} size={30} color="#7966FE" />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, backgroundColor: '#7966FE', borderRadius: 6, margin: 8, padding: 4 }}>

                    <FlatList
                        data={symbols.Symbols}
                        removeClippedSubviews={true}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={(this.state.flist1 === index && customStyleIndex === 0 && this.state.selected1 === this.state.category1) ? styles.flatview2TIC : ((this.state.flist2 === index && customStyleIndex === 1 && this.state.selected2 === this.state.category2) ? styles.flatview2TIC : ((this.state.flist3 === index && customStyleIndex === 2 && this.state.selected3 === this.state.category3) ? styles.flatview2TIC : styles.flatview2))}
                            onPress={() => this.setState({ prefix: this.state.prefix + item })}  >            
                                <Text allowFontScaling = {false} style={styles.textstyle2}> {item} </Text>
                                <Text allowFontScaling = {false} style={{ margin: 0, fontSize: 12, paddingTop: 1, marginLeft: 2, color: '#244E53' }}>{index}</Text>
                            </TouchableOpacity>
                        )}
                        //Setting the number of column
                        numColumns={5}
                        keyExtractor={(item, index) => index}
                    />

                </View>

            </View>
        )
    }
}