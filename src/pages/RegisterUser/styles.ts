import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background: #181A1F;
    flex: 1;
    padding: 20px;
    justify-content: space-between;
`;

export const ViewTop = styled.View`
    margin-top: 40px;
`

export const Title = styled.Text`
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
`;

export const Description = styled.Text`
    color: #5D5E63;
    text-align: center;
`;

export const LoginInput = styled.TextInput`
    background: #262A34;
    border-radius: 20px;
    padding: 15px;
    margin-top: 15px;
    font-size: 15px;
    color: #f4f4f4;
`;

export const ViewButton = styled.View`
    margin-top: 20px;
`;

export const SignInButton = styled.TouchableOpacity`
    background: #5467FF;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    height: 60px;
`;

export const SignInText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 15px;
`;

export const NoAccontView = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const NoAccontButton = styled.TouchableOpacity`
    
`;

export const NoAccontText = styled.Text`
    color: #fff;
    font-size: 13px;
`;

export const NoAccontCreate = styled.Text`
    color: #5467FF;
    font-size: 13px;
    margin-bottom: 50px;
`;

export const AlertText = styled.Text`
    color: #FD4B4E;
    margin-left: 12px;
`;

export const BoxModal = styled.View`
width: 200px;
height: 200px;
background-color: red;
`