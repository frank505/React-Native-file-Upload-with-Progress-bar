import { Image,Video } from "react-native-image-crop-picker";
import { BlobFile } from "./types";


  
  export const getBlobFile = (data:Image|Video):BlobFile =>
  {
    let image:BlobFile = { type: data.mime, uri: data.path, name: data.path.split("/").pop() };
    return image;
  }