import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth"
import AsyncStorage from "@react-native-community/async-storage";
import { StatusCode } from "../enums";
import { GenericModal } from "../components/Modal/GenericModal";

interface User {
    name: string | Number
}

interface AuthContextData {
    signed: boolean;
    user: any;
    loading: Boolean;
    modalToken: boolean;
    signIn(email: string, passowrd: string): Promise<boolean>;
    signOut(): void;
    TradeVisibleModalToken(trade: boolean): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalToken, setModalToken] = useState(false);

    useEffect(() => {
        async function loadAsyncData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth: user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
            setLoading(false)
        }
        loadAsyncData();
    }, [])

    function TradeVisibleModalToken(props: boolean){
        setModalToken(props)
    }

    async function signIn(email: string, passowrd: string) {
        const response = await auth.signIn(email, passowrd);
        let validation = response.status === StatusCode.Succeeded
        if (validation) {

            setUser(response.user);

            AsyncStorage.setItem('@token', response.token)
            AsyncStorage.setItem('@RNAuth: user', JSON.stringify(response.user))
        }
        return validation;

    }

    async function signOut() {
        setLoading(true)
        AsyncStorage.clear().then(() => {
            setUser(null)
        })
        await new Promise(resolved => setTimeout(resolved, 1000))

        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user: user, loading, modalToken, signIn, signOut, TradeVisibleModalToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UseAuth() {
    const context = useContext(AuthContext)
    return context;
}