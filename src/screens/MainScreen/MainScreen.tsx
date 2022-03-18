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
import { displayAlertMessage } from '../../helperfunctions/alertHelpers';
import { style } from './styles';
import ImageDescription from './ImageDescription';
import Button from '../../components/Button';








const MainScreen:React.FC<{}> = () => 
{

  const fileUpload = async(blobFile:BlobFile|undefined|null) =>
{
  let formData = new FormData();
  formData.append('file', blobFile);

  

   postRequest({
    method: 'POST',
    formData: formData,
    onUploadProgress: updateProgressBar,
    addedUrl: 'v0/add',
    contentType: 'multipart/form-data'
  });
 

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


  const successfullyUploadedFile = async(data:any):Promise<void> =>
  {
      setFileUploadProgress(1);
      displayAlertMessage({header:'Success',message:'Successfully uploaded file',callBackFunc:clearProgress});
  }


  const failedToUploadFile = async(err:any):Promise<void> =>
  {
    let completeProgress = 0;
    setFileUploadProgress(completeProgress);
    displayAlertMessage({header:'Failed',message:'file upload was not successful, please try again later',callBackFunc:clearProgress});
  }


 


  const {mutate,isLoading,isSuccess,isError} = useMutation(fileUpload,{retry: 3});


  const [fileProperty, setFileProperty] = useState<fileProperty>({
    fileName:'',
    filePath:'',
    fileSize:''
  });

  const [blobFile,setBlobFile] = useState<BlobFile|undefined|null>(null);
  const [fileUploadProgress,setFileUploadProgress] = useState<number>(0);

 
  
  






  const selectFile = async():Promise<void> =>
  {
   let selectedFile:Video|Image =  await ImagePicker.openPicker({mediaType:'any'});
   console.log(selectedFile);
    setFileProperty({...fileProperty,
      fileName:selectedFile.filename,
      filePath:selectedFile.path,
      fileSize:""+selectedFile.size+"kb"})
     setBlobFile(getBlobFile(selectedFile));
  } 


 

 
 const uploadFile = async():Promise<void> =>
 {
    mutate(blobFile,{
    onSuccess: async(data:any)=> await successfullyUploadedFile(data), 
    onError:async(err:any)=>  await failedToUploadFile(err)
  });
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
           ?
           'uploading file please wait...':
           blobFile==null?
           'Select File to Enable Button'
           : 
           ' Upload Selected File'} 
           testID={'uploadBtn'} 
           disabled={isLoading && blobFile==null ?true:false}
           onPress={async():Promise<void>=>await uploadFile()}
           />
         </View>

 
      </View>
        

    </View>
  )
}

export default MainScreen