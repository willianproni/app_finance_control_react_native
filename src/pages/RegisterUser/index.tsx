import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import { Container, Description, LoginInput, NoAccontButton, NoAccontView, SignInButton, SignInText, Title, NoAccontText, NoAccontCreate, AlertText, BoxModal, ViewButton, ViewTop } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { CreateNewUser } from "../../services/register"
import { propsStack } from "../../routes/models";
import { StatusCode } from "../../enums/index"
import { GenericModal } from "../../components/Modal/GenericModal";
import { LoadingModal } from "../../components/Modal/LoadingModal";

let ValidationLoginSchema = yup.object().shape({
    email: yup.string().email("Por favor inserir um Email Válido").required("Endereço de Email é obrigatório"),
    fullName: yup.string().matches(/(\w.+\s).+/, 'Obrigatório nome composto').required("Nome de usuário é obrigatório"),
    password: yup.string().min(8, ({ min }) => `A senha deve conter no mínimo ${min} caracteres`).required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], "Senha não é similar!").required("Campo Obrigatório")
});

interface User {
    fullName: string,
    email: string,
    password: string
}

export function RegisterUser() {
    const navigation = useNavigation<propsStack>()
    const [modalErro, setModalErro] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ModalRegister, setModalRegister] = useState(false)

    const userInfo = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    function VisibleModalErroLoginFalse(props: boolean) {
        setModalErro(props)
    }

    async function HandleRegisterUser(values: User) {
        setLoading(true)
        const response = await CreateNewUser(values.fullName, values.email, values.password);
        setLoading(false)
        if (response.status === StatusCode.Succeeded)
            setModalRegister(true)
        else if (response.status === StatusCode.Conflict)
            setModalErro(true)
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor="#181A1F" />
            <ViewTop>
                {loading &&
                    <LoadingModal />
                }
                {modalErro &&
                    <GenericModal
                        image={require('../../assets/EmailAlreadyRegister.png')}
                        titleModal="Email já está em uso, por favor utilize outro!"
                        function={VisibleModalErroLoginFalse}
                        textButton="Confirmar"
                    />
                }
                {ModalRegister &&
                    <GenericModal
                        image={require('../../assets/SignUpCheck.png')}
                        titleModal="Usuário Cadastrado com sucesso!"
                        function={() => navigation.navigate("Login")}
                        textButton="Confirmar"
                    />
                }
                <Title>Criar Nova Conta</Title>
                <Description>Por favor preencha o fomulário para continuar</Description>
            </ViewTop>
            <Formik
                initialValues={userInfo}
                validateOnMount={true}
                onSubmit={values => HandleRegisterUser(values)}
                validationSchema={ValidationLoginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                    <View>
                        <View>
                            <LoginInput
                                onChangeText={handleChange("fullName")}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                                placeholder="Nome Completo"
                                placeholderTextColor="#5D5E63"
                            />
                            {(errors.fullName && touched.fullName) &&
                                <AlertText>{errors.fullName}</AlertText>}
                            <LoginInput
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email@gmail.com"
                                placeholderTextColor="#5D5E63"
                            />
                            {(errors.email && touched.email) &&
                                <AlertText>{errors.email}</AlertText>}
                        </View>
                        <View>
                            <LoginInput
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Sua Senha..."
                                placeholderTextColor="#5D5E63"
                                secureTextEntry
                            />
                            {(errors.password && touched.password) &&
                                <AlertText>{errors.password}</AlertText>}
                            <LoginInput
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                placeholder="Confirmar Senha..."
                                placeholderTextColor="#5D5E63"
                                secureTextEntry
                            />
                            {(errors.confirmPassword && touched.confirmPassword) &&
                                <AlertText>{errors.confirmPassword}</AlertText>}

                            <ViewButton>
                                <SignInButton onPress={handleSubmit}>
                                    <SignInText>Criar Conta</SignInText>
                                </SignInButton>
                            </ViewButton>
                        </View>
                    </View>
                )}
            </Formik>
            <View>
                <NoAccontView>
                    <NoAccontText>Já tem uma conta?   </NoAccontText>
                    <NoAccontButton>
                        <NoAccontCreate onPress={() => navigation.navigate("Login")}>Faça Login</NoAccontCreate>
                    </NoAccontButton>
                </NoAccontView>
            </View>
        </Container>
    );
}