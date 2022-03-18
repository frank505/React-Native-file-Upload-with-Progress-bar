import * as React from 'react';
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import { RenderAPI, waitFor } from '@testing-library/react-native';
import TestWrapperComponent from './jest/TestWrapper';
import App from './App';
import { Alert } from 'react-native';


jest.useFakeTimers();


const renderComponent = ():RenderAPI =>
{
 return TestWrapperComponent(<App/>)
}



jest.mock('@react-native-community/netinfo', ()=>{
   return{
    useNetInfo: jest.fn().mockReturnValue({isConnected:true}),
   }  
})

describe('App test',()=>{
    it('calls netinfo', async()=>
    {
        renderComponent();
       await waitFor(()=>expect(useNetInfo).toHaveBeenCalled() );  
     });

     it('displays alert if no network', async()=>
     {
         jest.spyOn(Alert,'alert');
         jest.runAllTimers();
        const network = useNetInfo();
        network.isConnected = false;
         renderComponent();
       await waitFor(()=> expect(Alert.alert).toHaveBeenCalled())  ;
     })
})

