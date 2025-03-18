import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonBack, ButtonEdit, ButtonRemove, Container, TextButton, TextValues, ViewButton, ViewButtonEditAndRemove } from "./styles";
import Moment from "moment";
import { GenericModalDouble } from "../../components/Modal/GenericModalDouble";
import { propsStack } from "../../routes/models";
import { removeRelease } from "../../services/removeRelease";
import { StatusCode } from "../../enums";
import { UseAuth } from "../../contexts/auth";
import { Line } from "../../components/Line";
import { LoadingModal } from "../../components/Modal/LoadingModal";
import { GenericModal } from "../../components/Modal/GenericModal";

export function ReleaseInformation(props: any) {
    const confirmed = props.route.params.confirmed
    const { TradeVisibleModalToken } = UseAuth();
    const [loading, setLoading] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalDeleteSucess, setModalDeleteSucess] = useState(false)
    const navigation = useNavigation<propsStack>();
    const info = props.route.params.releaseDate
    Moment.locale('pt-br');

    async function HandleIdRemoveRelease() {
        setLoading(true)
        const response = await removeRelease(props.route.params.id)
        await new Promise(resolved => setTimeout(resolved, 1000))
        setLoading(false)

        if (response.status === StatusCode.NoContent) {
            setModalDelete(false)
            setModalDeleteSucess(true)
        }
        else if (response.status === StatusCode.Forbidden)
            TradeVisibleModalToken(true)
    }

    function confirmValue() {
        let response = props.route.params.confirmed
        let confirmed = ""
        response === true ? confirmed = "confirmado" : confirmed = "Não confirmado"
        return confirmed
    }

    return (
        <Container>
            <Text style={{ color: "#fff" }}>{props.route.params.ActionType}</Text>
            <View>
                <TextValues style={{ textAlign: "center" }}>{Moment(info).format('DD/MM/YYYY')}</TextValues>
                <Line />
                <View>
                    <TextValues>Descrição: {props.route.params.description}</TextValues>
                    <TextValues>R$: {props.route.params.value}</TextValues>
                    <TextValues style={{ textAlign: "center" }}>{confirmValue()}</TextValues>
                </View>
                <Line />
            </View>
            {loading &&
                <LoadingModal />
            }
            {modalDelete &&
                <GenericModalDouble
                    image={require("../../assets/Questions.png")}
                    titleModal="Deseja mesmo excluir esse lançamento?"
                    textButtonConfirm="Confirmar"
                    textButtonCancel="Cancelar"
                    functionVisible={() => setModalDelete(false)}
                    functionConfirm={HandleIdRemoveRelease}
                />
            }
            {modalDeleteSucess &&
                <GenericModal
                    image={require("../../assets/deleteSucess.png")}
                    titleModal="Lançamento deletado com sucesso!"
                    textButton="Ok"
                    function={() => navigation.navigate("Entrada")}
                />
            }
            <ViewButton>
                {!confirmed &&
                    <ViewButtonEditAndRemove>
                        <ButtonRemove onPress={() => setModalDelete(true)} disabled={confirmed === true}>
                            <Image source={require("../../assets/remove.png")} style={{ width: 40, height: 40 }} />
                        </ButtonRemove>
                        <ButtonEdit onPress={() => navigation.navigate("EditRelease", props.route.params)} disabled={confirmed === true}>
                            <Image source={require("../../assets/pencil.png")} style={{ width: 35, height: 35 }} />
                        </ButtonEdit>
                    </ViewButtonEditAndRemove>
                }
                <ButtonBack onPress={() => navigation.goBack()}>
                    <TextButton>Voltar</TextButton>
                </ButtonBack>
            </ViewButton>

        </Container >
    );
}