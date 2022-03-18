  import {Alert} from 'react-native';
import { CustomAlertMessageParams } from './types';



  

  export const displayAlertMessage = (alertParams:CustomAlertMessageParams):void => 
  {
    setTimeout(() => {
      Alert.alert(alertParams.header, alertParams.message, [
        {       
          text: 'Ok',
          onPress: (e) => alertParams.callBackFunc==null || alertParams.callBackFunc == undefined? null:
          alertParams.callBackFunc(e),
          style: 'cancel',
        },
      ]);
    }, 100);
  };
