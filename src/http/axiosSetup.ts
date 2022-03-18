import { PostRequestType } from './types';
import { API_BASE_URL } from './../constants';
import axios, { AxiosResponse } from "axios";




export const postRequest  = async(data:PostRequestType):Promise<AxiosResponse> =>
{
   return await axios.post(
         API_BASE_URL+data.addedUrl, 
        data.formData,
        {
         headers: { "Content-Type": data.contentType},
         onUploadProgress:(progressEvent:any) => data.onUploadProgress(progressEvent)
        })
    
    // return await axios({
    //     method:'POST',
    //     url:API_BASE_URL+data.addedUrl,
    //     data:data.formData,
    //     headers: { "Content-Type": data.contentType },
    //     onUploadProgress: (progressEvent:any): void => 
    //     {  
    //         data.onUploadProgress(progressEvent);  
    //    }
    //  });
}


