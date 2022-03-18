import {
    StyleSheet,
   StyleProp 
   } from 'react-native';
import { colors } from '../../theme/colors';



export const style:StyleProp<any> = StyleSheet.create({
componentParentView:
{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    alignContent:'center',
    height:'100%',width:'100%'
},
centerResponseText:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center'
},
setImageDetailTextStyle:{
    color:colors.textColor,
    fontWeight:'bold'
},



})