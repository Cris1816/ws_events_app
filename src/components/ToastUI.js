import { Toast } from "react-native-toast-message/lib/src/Toast";

export default (type, text1, text2) => 
{
    return Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      autoHide: true
    });
}