import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";

export function Loading(props: any) {
    const [loading, setLoading] = useState(true)

    return (
        <>
            {props.show
                && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#999" />
                    </View>
                )
            }
        </>
    )
}