import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #181A1F;
`;

export const ViewWelcome = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

export const Welcome = styled.Text`
    color: #fff;
    font-size: 20px;
`;

export const ViewEntryAndExit = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
`

export const ButtonEntryAndExit = styled.TouchableOpacity`
    background-color: #5467FF;
    width: 150px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

export const TextEntryAndExit = styled.Text`
    font-size: 20px;
    color: #fff;
`

export const Logout = styled.TouchableOpacity`
    background: #FD4B4E;
    border-radius: 50px;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
`

export const Task = styled.TouchableOpacity`
    justify-content: center;
    padding: 5px;
    height: 40px;
    background-color: #262A34;
    border: 1px solid #333334;
    border-radius: 5px;
    margin: 10px;
`;

export const TextTask = styled.Text`
    color: #C8CACE;
`

export const ModalLogOut = styled.View`
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.3);
justify-content: center;
align-items: center;
`

export const BoxModal = styled.View`
    width: 80%;
    height: 450px;
    background: #323232;
    border-radius: 15px;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
`

export const TextModalLogoff = styled.Text`
font-size: 25px;
color: #fff;
`

export const ViewModalButton = styled.View`
flex-direction: row;
width: 100%;
justify-content: space-around;
`

export const ButtonModalConfirm = styled.TouchableOpacity`
background-color: #5467FF;
width: 130px;
height: 40px;
justify-content: center;
align-items: center;
border-radius: 15px;
`

export const ButtonModalCancel = styled.TouchableOpacity`
background-color: #FD4B4E;
width: 130px;
height: 40px;
justify-content: center;
align-items: center;
border-radius: 15px;
`

export const TextListNull = styled.Text`
    color: #5D5E63;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    margin-top: 50px;
`
