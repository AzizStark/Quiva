import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    title: {
          fontSize: 20,
          padding: 8
      },

    content: {
          fontSize: 14,
          padding: 12,
          paddingLeft: 14
      },
 
    toolbar: {
      backgroundColor: "transparent",
      height: 56,
      alignSelf: 'stretch',
      textAlign: 'center',
      fontFamily: 'Quicksand-Medium',
      backgroundColor: '#7966FE'
    },
  
    container: {
      flex: 1, 
      backgroundColor: '#F3F2F7',
    },
  
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    //  ############## TEXT INPUT
  
    inputText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxHeight: 100,
      margin: 6,
      borderRadius: 6,
      backgroundColor: '#FFFFFF',
    },

    inputText2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      maxHeight: 100,
      margin: 6,
      borderRadius: 6,
      display:'flex',
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
  
    Typeitem: {
      flex: 1,
      fontSize: 18,
      marginVertical: 2.5,
      paddingLeft: 10
    },
  
    // ############## Flatlist
  
    modelinputtext: {
      flex: 1,
      fontSize: 20,
      height: hp('78%'),
      textAlignVertical: "top"
    },

    flatview: {
      marginTop: 0,
      margin: 6,
      marginBottom: 6,
      height: 55,
      backgroundColor: '#FFFFFF',
      borderRadius: 6,
    },
  
    Listviu: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingRight: 10,
    },
  
    item: {
      flex: 1,
      fontSize: 20,
      paddingRight: 2,
      paddingLeft: 10,
      color: '#244E53'
    },
  
    //##########################################################
  
    buttGradient: {
      width: wp('47%'),
      height: 50,
      borderRadius: 5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    butt: {
      fontSize: 12,
      fontWeight: '100',
      color: 'white',
    },
  
    //################################# 2nd Screen Styles 
  
    //Flatlist
    flatview2: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 4,
      backgroundColor: '#FFFFFF',
      borderRadius: 6,
    },
  
    flatview2TIC: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 4,
      backgroundColor: '#9a8cff',
      borderRadius: 6,
      color: '#00FF00'
    },
  
    textstyle2: {
      textAlign: 'center',
      flex: 1,
      textAlignVertical: 'center',
      height: 34,
      fontSize: 20,
      paddingTop: 8,
      color: '#244E53'
    },
  
    //########### butt2
  
    /* buttGradient2: {
       width: wp('30%'),
       height: 50,
       borderRadius: 5,
       borderWidth: 2,
       borderColor: '#557788',
       margin: 5,
       justifyContent: 'center',
       alignItems: 'center',
     }, */
       
    butt2: {
      fontSize: 12,
      fontWeight: '100',
      color: 'white',
    },
  
  });
  