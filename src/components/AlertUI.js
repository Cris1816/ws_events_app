export default (type, text1, text2) => 
{
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      autoHide: true
    });
}