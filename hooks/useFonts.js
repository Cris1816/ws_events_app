import * as Font from "expo-font";

export default useFonts = async () =>
    await Font.loadAsync({
        "Sharp_Sans": require("../assets/fonts/SharpSans.otf"),
        "Sharp_Sans_SemiBold": require("../assets/fonts/SharpSansSemibold.otf"),
        "Sharp_Sans_Bold": require("../assets/fonts/SharpSansBold.otf"),
    });

    