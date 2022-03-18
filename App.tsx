/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainScreen from './src/screens/MainScreen';
import NetInfo, {  useNetInfo }  from "@react-native-community/netinfo";
import { displayAlertMessage } from './src/helperfunctions/alertHelpers';


const App:React.FC = () =>
{

const networkCheck = useNetInfo();

  useEffect(()=>
  {
    networkCheck.isConnected==false ? displayAlertMessage({header:'Network Error',
    message:'No Network Connection was Found, Please Note that this app will function properly'}):null;
  
  },
  [networkCheck])




  const client = new QueryClient();

  return (
    <SafeAreaView>
      <StatusBar  />
      <QueryClientProvider client={client}>
          <MainScreen/>
      </QueryClientProvider>
       
    </SafeAreaView>

  )
}


export default App;

