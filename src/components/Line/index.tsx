import React from "react";
import { View } from "react-native";

export function Line() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#5D5E63' }} />
            <View>

            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: '#5D5E63' }} />
        </View>
    )
}