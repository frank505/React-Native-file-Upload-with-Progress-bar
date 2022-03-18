import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { ButtonType } from './types';
import { style } from './styles';







const Button:React.FC<ButtonType> = (
    {
        onPress,testID,
        backgroundColor,width,height,
        textString
      }
    ) => 
{

 
  return (
   
    <TouchableOpacity
           style={[style.selectFileButton,
            {backgroundColor:backgroundColor,
            width:width,
            height:height
            }]}
            onPress={onPress}
            testID={testID}
            >
           <Text style={style.selectFileText}>{textString}</Text>
       </TouchableOpacity>   
         
       
  )
}

export default Button