import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background: #181A1F;
    flex: 1;
    padding: 20px;
    justify-content: space-evenly;
`;

export const TextValues = styled.Text`
    color: #fff;
    font-size: 20px;
    padding: 5px;
`;

export const ViewDescription = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
`



export const ButtonBack = styled.TouchableOpacity`
    background: #5467FF;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: 50px;
`
export const ButtonEdit = styled.TouchableOpacity`
    background: #F1E44A;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: 50px;
    width: 160px;
`
export const ButtonRemove = styled.TouchableOpacity`
    background: #FD4B4E;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-top: 50px;
    width: 160px;
`

export const ViewButtonEditAndRemove = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const ViewButton = styled.View`
   
`

export const TextButton = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 20px; 
`