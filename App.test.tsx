import * as React from 'react';
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import { RenderAPI, waitFor } from '@testing-library/react-native';
import TestWrapperComponent from './jest/TestWrapper';
import App from './App';




const renderComponent = ():RenderAPI =>
{
 return TestWrapperComponent(<App/>)
}



jest.mock('@react-native-community/netinfo', ()=>{
   return{
    useNetInfo: jest.fn().mockResolvedValue({isConnected:true}),
   }  
})


it('calls netinfo', ()=>{
   renderComponent();
   waitFor(()=>expect(addEventListener).toHaveBeenCalled() );  
})