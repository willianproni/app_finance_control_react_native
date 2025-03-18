import React, { useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Container, InputsPost, RadioText, Title, ViewRadioGroup, TextButton, Description, AlignRadioGroup, ButtonRegister, ViewButton, ButtonDate, AlertText, ViewConfirmedRadioButton, ButtonClear, ViewInputValue, InputsPostValue, TextMoney } from "./styles";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import moment from "moment";
import { PostRelease } from "../../services/PostRelease";
import { StatusCode } from "../../enums";
import DatePicker from 'react-native-date-picker'
import { GenericModal } from "../../components/Modal/GenericModal";
import { propsStack } from "../../routes/models";
import { UseAuth } from "../../contexts/auth";
import { Line } from "../../components/Line";
import TextInputMask from 'react-native-masked-input'
import { LoadingModal } from "../../components/Modal/LoadingModal";
import { ViewDate } from "../EditRelease/styles";

let ValidationFormPostRelease = yup.object().shape({
    description: yup.string().required("Descrição é obrigatória!"),
    value: yup.string().required("Valor é obrigatório").min(1, ({ min }) => `O valor deve conter no mínimo ${min} digito`),
    typeAction: yup.string().required("Selecione um tipo!"),
    confirmed: yup.string().required("Campo Obrigatório")
});

export function PostReleaseFinance() {
    const { TradeVisibleModalToken } = UseAuth();
    const navigation = useNavigation<propsStack>();
    const [loading, setLoading] = useState(false)
    const [ModalVisible, setVisibleModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const newRelease = {
        releaseDate: '',
        description: '',
        value: '',
        confirmed: false,
        typeAction: ''
    }

    async function SeachValues(props: any) {
        setLoading(true)
        const response = await PostRelease(props, date)
        await new Promise(resolved => setTimeout(resolved, 1000))
        setLoading(false)

        if (response.status === StatusCode.Succeeded)
            setVisibleModal(true)
        else if (response.status === StatusCode.Forbidden)
            TradeVisibleModalToken(true)
    }

    function ConfirmedRelease() {
        setVisibleModal(false)
        navigation.navigate("Entrada")
    }

    return (
        <Container>
            {loading &&
                <LoadingModal />
            }
            {ModalVisible &&
                <GenericModal
                    image={require("../../assets/check.png")}
                    titleModal="Lançamento cadastrado com sucesso!"
                    textButton="Ok"
                    function={ConfirmedRelease}
                />
            }
            <Title>Novo Lançamento</Title>
            <Line />
            <Formik
                initialValues={newRelease}
                validateOnMount={true}
                onReset={() => { }}
                onSubmit={(values, { resetForm }) => { SeachValues(values), resetForm() }}
                validationSchema={ValidationFormPostRelease}
            >
                {({ handleChange, handleBlur, handleSubmit, handleReset, values, touched, errors, isValid }) => (
                    <View>
                        <View>
                            <Description>Descrição:</Description>
                            <InputsPost
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur('description')}
                                value={values.description}
                                placeholder="Descrição..."
                                placeholderTextColor="#5D5E63"
                            />
                            {(errors.description && touched.description) &&
                                <AlertText>{errors.description}</AlertText>}
                            <Description>Valor:</Description>
                            <TextInputMask style={{ color: "#fff", borderRadius: 20, padding: 15, backgroundColor: '#262A34' }}
                                type={"money"}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                onChangeText={handleChange("value")}
                                value={values.value}
                                placeholder="Valor..."
                                placeholderTextColor="#5D5E63"
                            />
                            {(errors.value && touched.value) &&
                                <AlertText>{errors.value}</AlertText>}
                        </View>
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
                        <View>
                            <View>
                                <Description>Tipo:</Description>
                                <RadioButton.Group
                                    onValueChange={handleChange('typeAction')}
                                    value={values.typeAction}
                                >
                                    <ViewRadioGroup>
                                        <AlignRadioGroup>
                                            <RadioText>Entrada</RadioText>
                                            <RadioButton color="#fff" uncheckedColor="#fff" value='Entrada'></RadioButton>
                                        </AlignRadioGroup>
                                        <AlignRadioGroup>
                                            <RadioText>Saída</RadioText>
                                            <RadioButton color="#fff" uncheckedColor="#fff" value='Saída'></RadioButton>
                                        </AlignRadioGroup>
                                    </ViewRadioGroup>
                                </RadioButton.Group>
                            </View>

                            {(errors.typeAction && touched.typeAction) &&
                                <AlertText style={{ textAlign: "center" }}>{errors.typeAction}</AlertText>}
                        </View>
                        <View>
                            <View>
                                <RadioButton.Group
                                    onValueChange={handleChange('confirmed')}
                                    value={`${values.confirmed}`}
                                >
                                    <ViewRadioGroup>
                                        <ViewConfirmedRadioButton>
                                            <RadioButton color="#fff" uncheckedColor="#fff" value="True"></RadioButton>
                                            <RadioText>Deseja confirmar esse lançamento?</RadioText>
                                        </ViewConfirmedRadioButton>
                                    </ViewRadioGroup>
                                </RadioButton.Group>
                            </View>
                            {(errors.confirmed && touched.confirmed) &&
                                <AlertText style={{ textAlign: "center" }}>{errors.confirmed}</AlertText>}
                        </View>
                        <ViewButton>
                            <ButtonRegister onPress={function () {
                                if (`${values.confirmed}` === "True")
                                    values.confirmed = true
                                else
                                    values.confirmed = false
                                const convertValue = values.value.replace("R$", '').replace(",", ".")
                                values.value = convertValue
                                handleSubmit()
                            }} >
                                <Text style={{ fontSize: 20 }}>Cadastrar</Text>
                            </ButtonRegister>
                            <ButtonClear onPress={handleReset}>
                                <Text style={{ fontSize: 18 }}>Limpar</Text>
                            </ButtonClear>
                        </ViewButton>
                    </View>
                )}
            </Formik>
        </Container >
    );
}