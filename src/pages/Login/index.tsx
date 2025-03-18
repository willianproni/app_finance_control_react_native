import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView, StatusBar } from "react-native";
import { Container, Description, LoginInput, NoAccontButton, NoAccontView, SignInButton, SignInText, Title, NoAccontText, NoAccontCreate, AlertText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { UseAuth } from "../../contexts/auth";
import { Formik } from "formik";
import * as yup from "yup";
import { propsStack } from "../../routes/models";
import { GenericModal } from "../../components/Modal/GenericModal";

let ValidationLoginSchema = yup.object().shape({
    email: yup.string().email("Por favor inserir um Email Valido").required("Endereço de Email obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
});

interface login {
    email: string;
    password: string
}

export function Login() {
    const navigation = useNavigation<propsStack>();
    const [modalErro, setModalErro] = useState(false)
    const { signIn } = UseAuth();

    const loginInfo = {
        email: '',
        password: ''
    }

    function VisibleModalErroLoginFalse() {
        setModalErro(false)
    }

    async function handleSingIn(values: login) {
        const response = await signIn(values.email, values.password)
        if (!response) {
            setModalErro(true)
        }
    }

    return (

        <Formik
            initialValues={loginInfo}
            validateOnMount={true}
            onSubmit={values => handleSingIn(values)}
            validationSchema={ValidationLoginSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                <Container>
                    {modalErro &&
                        <GenericModal
                            image={require('../../assets/DoNotEnter.png')}
                            titleModal="Email ou senha Inválida, verifique as informações e tente novamente!"
                            textButton="Confirmar"
                            function={VisibleModalErroLoginFalse}
                        />
                    }
                    <StatusBar barStyle="light-content" backgroundColor="#181A1F" />
                    <View>
                        <Title>Bem-Vindo Finance!</Title>
                        <Description>Por favor entre na sua conta</Description>
                    </View>

                    <View>
                        <View>
                            <LoginInput
                                onChangeText={handleChange('email')}
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
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Sua Senha..."
                                placeholderTextColor="#5D5E63"
                                secureTextEntry
                            />
                            {(errors.password && touched.password) &&
                                <AlertText>{errors.password}</AlertText>}
                        </View>
                    </View>

                    <View>
                        <SignInButton onPress={handleSubmit}>
                            <SignInText>Entrar no Sistema</SignInText>
                        </SignInButton>
                    </View>

                    <View>
                        <NoAccontView>
                            <NoAccontText>Não tem Conta?    </NoAccontText>
                            <NoAccontButton>
                                <NoAccontCreate onPress={() => navigation.navigate("RegisterUser")}>Criar</NoAccontCreate>
                            </NoAccontButton>
                        </NoAccontView>
                    </View>

                </Container>
            )}
        </Formik>
    );
}