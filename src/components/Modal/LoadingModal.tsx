import React from "react";
import { Modal } from "react-native";
import { Loading } from "../Loading";
import { Box, BoxBody } from "./styles";

export function LoadingModal(){
    return(
        <>
            <Modal
                visible={true}
                animationType="fade"
                transparent={true}
            >
                <Box>
                    <BoxBody>
                        <Loading show={true}/>
                    </BoxBody>
                </Box>        
            </Modal>
        </>
    )
}