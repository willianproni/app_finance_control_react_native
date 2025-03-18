import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Container, Logout, ViewWelcome, Welcome } from "./styles";
import { propsStack } from "../../routes/models";
import { UseAuth } from "../../contexts/auth";
import { FlatList, Image, StatusBar } from "react-native";
import { GetList } from "../../services/getList";
import LaunchList from "../../components/LaunchList";
import DateTime from "../../components/DateTime";
import { Loading } from "../../components/Loading";
import { GenericModalDouble } from "../../components/Modal/GenericModalDouble";
import { alterConfirm } from "../../services/alterConfirmed";
import { Line } from "../../components/Line";
import { StatusCode } from "../../enums";
import { TextListNull } from "../DisplayEntry/styles";

export function DisplayExit() {
    const navigation = useNavigation<propsStack>();
    const { signOut, user, TradeVisibleModalToken } = UseAuth();
    const [exitList, setExit] = useState([]);
    const [loading, setLoading] = useState(false)
    const [idCheck, setIdCheck] = useState(String)
    const [modalVisible, setModalVisible] = useState(false)
    const [ModalConfirmed, setModalConfirmed] = useState(false)
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState((new Date().getMonth() + 1))

    function TradeVisibleModal(props: boolean) {
        setModalVisible(props)
    }

    function SetIdCheckBoxModal(id: string) {
        setIdCheck(id)
        setModalConfirmed(true)
    }

    async function TradeConfirmRelease() {
        await alterConfirm(idCheck);
        setModalConfirmed(false)
    }

    function SendIdInformation(id: any) {
        navigation.navigate("ReleaseInformation", id)
    }

    function TradeYearAndMonth(year: number, month: number) {
        setYear(year)
        setMonth(month)
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        async function HandleGetList() {
            setLoading(true)
            const params = { year, month }
            const response = await GetList(params)

            if (response.status === StatusCode.Succeeded)
                setExit(response.data.exit)
            else if (response.status === StatusCode.NotFound)
                TradeVisibleModalToken(true)
            setLoading(false)
        }
        HandleGetList()
    }, [year, month, isFocused, ModalConfirmed === false])

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#181A1F" />
            {modalVisible &&
                <GenericModalDouble
                    image={require('../../assets/logoff.png')}
                    titleModal="Deseja sair da sua conta?"
                    textButtonConfirm="Confirmar"
                    textButtonCancel="Cancelar"
                    functionConfirm={signOut}
                    functionVisible={TradeVisibleModal} />
            }
            {ModalConfirmed &&
                <GenericModalDouble
                    image={require('../../assets/confirmedCheckBox.png')}
                    titleModal="Deseja confirmar esse lançamento?"
                    textButtonConfirm="Confirmar"
                    textButtonCancel="Cancelar"
                    functionConfirm={TradeConfirmRelease}
                    functionVisible={() => setModalConfirmed(false)} />
            }
            
            <ViewWelcome>
                <Welcome>Bem-Vindo {user?.name}</Welcome>
                <Logout onPress={() => setModalVisible(true)}>
                    <Image source={require("./../../assets/exit.png")} style={{ width: 25, height: 25 }} />
                </Logout>
            </ViewWelcome>
            <Line />
            <DateTime function={TradeYearAndMonth} />
            <Line />
            {exitList.length === 0 &&
                <TextListNull>Nenhum Lançamento Cadastrado</TextListNull>
            }
            <Loading show={loading} />
            {loading === false &&
                <FlatList
                    data={exitList}
                    renderItem={({ item }) => <LaunchList data={item} SendIdInformation={SendIdInformation} SetIdCheckBoxModal={SetIdCheckBoxModal} />}
                />
            }
        </Container>
    );
}