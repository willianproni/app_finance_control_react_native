import React, { useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { Box, BoxBody, ButtonCancel, ButtonConfirm, TextModal } from "./styles";

export function GenericModalDouble(props: any) {
    const [visibleModal, setVisibleModal] = useState(true)
    return (
        <>
            <Modal
                visible={visibleModal}
                animationType="fade"
                transparent={true}
            >
                <Box>
                    <BoxBody>
                        <Image source={props.image} style={{ width: 250, height: 250 }} /> 
                        <TextModal>{props.titleModal}</TextModal>
                        <View style={{ width: 250, justifyContent: "center", alignItems: "center" }}>
                            <ButtonConfirm onPress={() => props.functionConfirm()}>
                                <Text style={{ color: "#fff" }}>{props.textButtonConfirm}</Text>
                            </ButtonConfirm>
                            <ButtonCancel onPress={() => props.functionVisible(false)}>
                                <Text style={{ color: "#fff" }}>{props.textButtonCancel}</Text>
                            </ButtonCancel>
                        </View>
                    </BoxBody>
                </Box>

            </Modal>
        </>
    );
}