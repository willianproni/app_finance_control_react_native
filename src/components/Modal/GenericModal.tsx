import React, { useState } from "react";
import { Image, Modal, Text } from "react-native";
import { Box, BoxBody, ButtonConfirm, TextModal } from "./styles";

export function GenericModal(props: any) {
    return (
        <>
            <Modal
                visible={true}
                animationType="fade"
                transparent={true}
            >
                <Box>
                    <BoxBody>
                        <Image source={props.image} style={{ width: 250, height: 250 }} />
                        <TextModal>{props.titleModal}</TextModal>
                        <ButtonConfirm onPress={() => props.function()}>
                            <Text style={{ color: "#fff" }}>{props.textButton}</Text>
                        </ButtonConfirm>
                    </BoxBody>
                </Box>

            </Modal>
        </>
    );
}