import { BaseToast, ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

export const toastConfig = 
{
    success: (props) => 
    (
      <SuccessToast
            {...props}
            style={{ borderLeftColor: '#28B463', backgroundColor: '#323A61' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style=
            {{
                fontSize: 15,
                fontWeight: '800',
                fontFamily: 'Sharp_Sans_Bold',
                color: '#28B463'
            }}
            text2Style=
            {{
                fontSize: 12,
                fontWeight: '200',
                fontFamily: 'Sharp_Sans'
            }}
      />
    ),
    error: (props) => 
    (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#C70039', backgroundColor: '#323A61' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style=
            {{
                fontSize: 15,
                fontWeight: '800',
                fontFamily: 'Sharp_Sans_Bold',
                color: '#C70039'
            }}
            text2Style=
            {{
                fontSize: 12,
                fontWeight: '200',
                fontFamily: 'Sharp_Sans'
            }}
        />
    ),
    info: (props) => 
    (
        <InfoToast
            {...props}
            style={{ borderLeftColor: '#0097B8', backgroundColor: '#323A61' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style=
            {{
                fontSize: 15,
                fontWeight: '800',
                fontFamily: 'Sharp_Sans_Bold',
                color: '#0097B8'
            }}
            text2Style=
            {{
                fontSize: 12,
                fontWeight: '200',
                fontFamily: 'Sharp_Sans'
            }}
        />
      ),
};