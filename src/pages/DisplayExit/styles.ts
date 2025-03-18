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