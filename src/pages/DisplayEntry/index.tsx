import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Container, Logout, TextListNull, ViewWelcome, Welcome } from "./styles";
import { propsStack } from "../../routes/models";
import { UseAuth } from "../../contexts/auth";
import { FlatList, Image, StatusBar } from "react-native";
import { GetList } from "../../services/getList";
import LaunchList from "../../components/LaunchList";
import DateTime from "../../components/DateTime";
import { Loading } from "../../components/Loading";
import { GenericModalDouble } from "../../components/Modal/GenericModalDouble";
import { alterConfirm } from "../../services/alterConfirmed";
import { StatusCode } from "../../enums";
import { Line } from "../../components/Line";

export function DisplayEntry() {
    const navigation = useNavigation<propsStack>();
    const { signOut, user, TradeVisibleModalToken } = UseAuth();
    const [loading, setLoading] = useState(false)
    const [entryList, setEntry] = useState([]);
    const [idCheck, setIdCheck] = useState<string>('')
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
        const response = await alterConfirm(idCheck);
        if (response.status === StatusCode.NoContent)
            setModalConfirmed(false)
        else if (response.status === StatusCode.Forbidden)
            TradeVisibleModalToken(true)
    }

    function TradeYearAndMonth(year: number, month: number) {
        setYear(year)
        setMonth(month)
    }

    function SendIdInformation(params: any) {
        navigation.navigate("ReleaseInformation", params)
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        async function HandleGetList() {
            setLoading(true)
            const params = { year, month }
            const response = await GetList(params)
            if (response.status === StatusCode.Succeeded)
                setEntry(response.data.entry)
            else if (response.status === StatusCode.Forbidden)
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

            <Loading show={loading} />
            {entryList.length === 0 &&
                <TextListNull>Nenhum Lançamento Cadastrado</TextListNull>
            }
            {loading === false &&
                <FlatList
                    data={entryList}
                    renderItem={({ item }) => <LaunchList data={item} SendIdInformation={SendIdInformation} SetIdCheckBoxModal={SetIdCheckBoxModal} />}
                />
            }
        </Container>
    );
}