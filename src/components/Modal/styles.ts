import styled from "styled-components/native";

export const Box = styled.View`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`

export const BoxBody = styled.View`
    width: 70%;
    height: 420px;
    background: #323232;
    border-radius: 15px;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
`

export const TextModal = styled.Text`
    font-size: 20px;
    color: #fff;
    text-align: center;
`

export const ButtonConfirm = styled.TouchableOpacity`
    background-color: #5467FF;
    width: 90%;
    margin-bottom: 10px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

export const ButtonCancel = styled.TouchableOpacity`
    background-color: #FD4B4E;
    width: 90%;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`