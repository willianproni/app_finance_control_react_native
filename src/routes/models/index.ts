import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack ={
    Login: undefined;
    RegisterUser: undefined;
    DisplayFinance: undefined;
    DisplayMain: undefined;
    ReleaseInformation: undefined;
    EditRelease: undefined;
    Entrada: undefined;
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>