import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, {  useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { colors } from '../../theme/colors';
import ImagePicker,{Image,Video} from 'react-native-image-crop-picker';
import { fileProperty } from './types';
import { getBlobFile } from '../../helperfunctions/fileHelpers';
import { BlobFile } from '../../helperfunctions/types';
import {useMutation} from 'react-query'
import { postRequest } from '../../http/axiosSetup';
import { style } from './styles';
import ImageDescription from './ImageDescription';
import Button from '../../components/Button';
import { AxiosResponse } from 'axios';









const MainScreen:React.FC<{}> = () => 
{


  const [fileProperty, setFileProperty] = useState<fileProperty>({
    fileName:'',
    filePath:'',
    fileSize:''
  });

  const [blobFile,setBlobFile] = useState<BlobFile|null>(null);
  const [fileUploadProgress,setFileUploadProgress] = useState<number>(0);


  const fileUpload = async(blobFile:BlobFile|undefined|null):Promise<any> =>
{
 
  let formData = new FormData();
  formData.append('file', blobFile);

  return  postRequest({
    method: 'POST',
    formData: formData,
    onUploadProgress: updateProgressBar,
    addedUrl: 'v0/add',
    contentType: 'multipart/form-data'
  }).then((data)=>{
   return successfullyUploadedFile(data);
  }).catch((err)=>
  {
   return failedToUploadFile(err)
  })
 

}


const updateProgressBar = (progressEvent:any):void =>
{ 
  let numberCount:number =  (progressEvent.loaded/progressEvent.total) - 0.02;
  setFileUploadProgress(numberCount);
}


  const clearProgress =() =>
  {
    setFileUploadProgress(0);
    setFileProperty({...fileProperty,fileName:'',filePath:'',fileSize:''});
    setBlobFile(null);
  }


  const successfullyUploadedFile = async(data:AxiosResponse):Promise<void> =>
  {
      setFileUploadProgress(1);
      Alert.alert('Success','Successfully uploaded file', 
      [
              {       
                text: 'Ok',
                onPress: clearProgress,
                style: 'cancel',
              },
            ]
      );
  }


  const failedToUploadFile = (err:Error) =>
  {
    setFileUploadProgress(0);
    Alert.alert('Failed','file upload was not successful, please try again later', 
    [
            {       
              text: 'Ok',
              onPress: clearProgress,
              style: 'cancel',
            },
          ]
    );
  }

  const {mutate,isLoading} = useMutation(fileUpload,{retry: 3});

 

  const selectFile = async():Promise<void> =>
  {
   let selectedFile:Video|Image =  await ImagePicker.openPicker({mediaType:'any'});
    setFileProperty({...fileProperty,
      fileName:selectedFile.filename,
      filePath:selectedFile.path,
      fileSize:""+selectedFile.size+"kb"})
     setBlobFile(getBlobFile(selectedFile));
  } 


 

 
 const uploadFile = async(blobFile:BlobFile|null):Promise<void> =>
 {
 return blobFile == null ?
       Alert.alert('Error','Please select a file')
    :
    mutate(blobFile);
 
 } 


  return (
    <View style={style.componentParentView}>

         {/** image description */}
        <ImageDescription fileProperty={fileProperty} />
         
         {/** file selection area */}
         <View>
          <Button textString={'Select File'} testID={'selectFile'} onPress={selectFile}/> 
         </View>

     {/** upload button section & progress bar */}
      <View style={{width:'60%'}}>

        <Progress.Bar progress={fileUploadProgress} height={15} 
        color={colors.green}
         unfilledColor={colors.lightGrey}
         borderColor={colors.lightGrey} width={null} 
         testID='progressBar'
         />
          

         <View style={{marginTop:20}}>

           <Button textString={
             isLoading
           ?'uploading file please wait...':
           ' Upload Selected File'} 
           testID={'uploadBtn'} 
            disabled={isLoading ?true :false}
           onPress={async()=>await uploadFile(blobFile)}
           />
         </View>

 
      </View>
        

    </View>
  )
}

export default MainScreen