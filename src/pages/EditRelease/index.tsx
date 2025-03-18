import React, { useState } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'
import { Container, Title, InputsPost, ButtonConfirm, ButtonDate, TextButton, Description } from "../PostReleaseFinance/styles"
import { ButtonBack, ViewButton, ViewDate } from "./styles";
import { propsStack } from "../../routes/models";
import { RequestEditRelease } from "../../services/EditRelease";
import { GenericModal } from "../../components/Modal/GenericModal";
import moment from "moment";
import { StatusCode } from "../../enums";
import { UseAuth } from "../../contexts/auth";
import { Line } from "../../components/Line";
import { LoadingModal } from "../../components/Modal/LoadingModal";
import { Text } from "react-native-paper";
import { TextInputMask } from "react-native-masked-input";

export function EditRelease(props: any) {
    const navigation = useNavigation<propsStack>();
    const id: string = props.route.params.id
    const { TradeVisibleModalToken } = UseAuth();
    const [modalEdit, setModalEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(moment(props.route.params.releaseDate).toDate() ?? new Date())
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState<string>(props.route.params.description)
    const [values, setValue] = useState<string>(props.route.params.value)

    async function HandleInfoRequestEdit() {
        const convert = values.replace("R$", '').replace(",", ".")
        const value = convert
        setLoading(true)
        const updateRelease = { id, description, value, date }
        const response = await RequestEditRelease(updateRelease)
        await new Promise(resolved => setTimeout(resolved, 1000))
        setLoading(false)
        if (response.status === StatusCode.NoContent)
            setModalEdit(true)
        else if (response.status === StatusCode.Forbidden)
            TradeVisibleModalToken(true)
    }

    return (
        <Container>
            <Title>
                Alterar Lançamento
            </Title>
            <Line />
            {loading &&
                <LoadingModal />
            }
            {modalEdit &&
                <GenericModal
                    image={require('../../assets/ConfirmedEdit.png')}
                    titleModal="Lançamento Editado com sucesso!!"
                    textButton="Ok"
                    function={() => navigation.navigate("Entrada")}
                />
            }
            <Description>Descrição:</Description>
            <InputsPost
                value={description}
                onChangeText={setDescription}
            />
            <Description>Valor:</Description>
            {/* <InputsPost
                value={`${values}`}
                onChangeText={setValue}
            /> */}
            <TextInputMask style={{ color: "#fff", borderRadius: 20, padding: 15, backgroundColor: '#262A34' }}
                type={"money"}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                    suffixUnit: ''
                }}
                onChangeText={setValue}
                value={`${values}`}
                placeholder="Valor..."
                placeholderTextColor="#5D5E63"
            />
            <View>
                <View style={{ alignItems: 'center' }}>
                    <ViewDate>
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                            Data: {moment(date).format('DD/MM/YYYY')}
                        </Text>
                        <ButtonDate onPress={() => setOpen(true)}>
                            <TextButton>Calendário</TextButton>
                        </ButtonDate>
                    </ViewDate>
                    <DatePicker
                        modal
                        theme='dark'
                        title={"Selecione a Data"}
                        open={open}
                        date={date}
                        minimumDate={new Date()}
                        is24hourSource='locale'
                        cancelText='Cancelar'
                        confirmText='Confirmar'
                        onDateChange={setDate}
                        mode='date'
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
            </View>
            <ViewButton>
                <ButtonConfirm onPress={HandleInfoRequestEdit}>
                    <TextButton>Salvar atualizações</TextButton>
                </ButtonConfirm>
                <ButtonBack onPress={() => navigation.navigate("DisplayMain")}>
                    <TextButton>Cancelar</TextButton>
                </ButtonBack>
            </ViewButton>
        </Container>
    );
}