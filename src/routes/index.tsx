import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GenericModal } from "../components/Modal/GenericModal";
import { UseAuth } from "../contexts/auth";
import { AppRoutes } from "./app.stack";
import { AuthRoutes } from "./auth.stack";
import { Loading } from '../components/Loading/index'

export default function Routes() {
    const { signed, loading, modalToken, signOut, TradeVisibleModalToken } = UseAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#181A1F" }}>
                <ActivityIndicator size="large" color="#999" />
            </View>
        );
    }

    function ConfirmedTokenExpired() {
        signOut()
        TradeVisibleModalToken(false)
    }

    if (modalToken) {
        return (
                <GenericModal
                    image={require("../assets/expiredToken.png")}
                    titleModal="Sessão Expirada, faça login novamente!"
                    textButton="Confirmar"
                    function={ConfirmedTokenExpired}
                />
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />

}