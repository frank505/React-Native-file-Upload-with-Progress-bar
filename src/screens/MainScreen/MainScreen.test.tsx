import React from 'react';
import { fireEvent, render, RenderAPI,waitFor } from "@testing-library/react-native"
import { Alert } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import MainScreen from "./MainScreen";
import TestWrapperComponent from '../../../jest/TestWrapper';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-test-renderer';




const mock = new MockAdapter(axios);


const imageSpec:any = {
  exif: null,
  localIdentifier: "C80D5E1C-CA05-416C-A0D3-F82BD9EE2355/L0/001",
  filename: "IMG_4416.PNG",
  width: 1125,
  modificationDate: "1647491098",
  mime: "image/jpeg",
  path: "/react-native-image-crop-picker/D04D3ECC-3130-4B80-915A-CAEA4736DE87.jpg",
  size: 492047,
  cropRect: null,
  data: null,
  sourceURL: "/IMG_4416.PNG",
  height: 2436,
  duration: null,
  creationDate: "1647491097",
  mediaType:"any"
}


const renderComponent = ():RenderAPI =>
{
 return TestWrapperComponent(<MainScreen/>)
}


const setup = ()=>
{
    const {getByTestId,findByTestId,getByText} = renderComponent();
    const selectFile = getByTestId('selectFile');
    const uploadBtn = getByTestId('uploadBtn');
   
    return {
        getByTestId,
        findByTestId,
        getByText,
      
        selectFile,
        uploadBtn,
    }
    

}




jest.mock('react-native-image-crop-picker', () => {
    const actual = jest.requireActual('react-native-image-crop-picker');
    return {
      ...actual,
      openPicker:jest.fn().mockReturnValue(Promise.resolve(imageSpec))
    };
  });

  





 const resetAllData = (Alert:any)=>
 {
  expect(Alert.alert).toHaveBeenCalled();
  let alertMock:any = Alert.alert;
  alertMock.mock.calls[0][2][0].onPress(); 
 }






describe('MainScreen test', () => 
{

 afterEach(()=>{
  jest.restoreAllMocks();

 });


   it('renders component correctly', async()=>{
      await waitFor(()=> renderComponent()) ;
   });
  

   it('no file selected', async()=>
   {
    jest.spyOn(Alert,'alert');
    const {uploadBtn} = setup();
   fireEvent.press(uploadBtn) ; 
   expect(Alert.alert).toHaveBeenCalled() ;   
   })
   
   it('select a file', async()=> {

    jest.spyOn(Alert,'alert');
    const {selectFile} = setup();
       /** select an image or video */
    await waitFor(()=> fireEvent.press(selectFile))  ; 
    expect(ImageCropPicker.openPicker).toHaveBeenCalled();
   });


  
   it('checks for file upload progress',async()=>
   {
    jest.spyOn(Alert,'alert');
    const {selectFile,uploadBtn} = setup();
       // this mocks a request which is always at 40% progress
     mock.onPost().reply((config) => {
     const total = 1024; // mocked file size
     const progress = 0.4;
  if (config.onUploadProgress) config.onUploadProgress({ loaded: total * progress, total });
    return new Promise(() => {});
   });

    fireEvent.press(selectFile);
   expect(ImageCropPicker.openPicker).toHaveBeenCalled() ; 
     await waitFor(()=> fireEvent.press(uploadBtn));

   })



   it('uploads files successfully', async() =>
   {
    jest.spyOn(Alert,'alert');
    const {selectFile,uploadBtn} = setup();  
     axios.post = jest.fn().mockResolvedValueOnce(Promise.resolve({}));
   await waitFor(()=>fireEvent.press(selectFile))
    expect(ImageCropPicker.openPicker).toHaveBeenCalled() ; 
    await waitFor(()=> fireEvent.press(uploadBtn)) ;  
   expect(axios.post).toHaveBeenCalled(); 
   resetAllData(Alert);
    
   });

   it('fails to upload file', async()=>
   {
    jest.spyOn(Alert,'alert');
    const {selectFile,uploadBtn} = setup();  
    axios.post = jest.fn().mockRejectedValueOnce(new Error('error uploading file'));
    await waitFor(()=> fireEvent.press(selectFile)) ;
    expect(ImageCropPicker.openPicker).toHaveBeenCalled() ;    
    await waitFor(()=> fireEvent.press(uploadBtn)) ;
    expect(axios.post).toHaveBeenCalled(); 
    resetAllData(Alert);
   })


  })
