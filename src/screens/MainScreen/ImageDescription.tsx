import { View, Text } from 'react-native'
import React from 'react';
import { style } from './styles';
import { ImageDescriptionType } from './types';







const ImageDescription:React.FC<ImageDescriptionType> = ({fileProperty}) => 
{

 
  return (
   
         <View style={style.centerResponseText} >
         <Text style={style.setImageDetailTextStyle}>
          {fileProperty.fileName==''? 'selected file name':'NAME: '+fileProperty.fileName }  </Text>
         <Text style={style.setImageDetailTextStyle}>
          {fileProperty.filePath==''? 'selected file path':'PATH: '+fileProperty.filePath}
          </Text>
          <Text style={style.setImageDetailTextStyle} >
          {fileProperty.fileSize==''? 'selected file size':'SIZE:'+fileProperty.fileSize}</Text>
         </View>
         
       
  )
}

export default ImageDescription