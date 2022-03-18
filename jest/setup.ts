import { NativeModules } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};


//a function to tell if a pressable object is disabled or enabled
export function isDisabled(element:any) {
    return !!element?.props.onStartShouldSetResponder?.testOnly_pressabilityConfig()?.disabled;
  }
