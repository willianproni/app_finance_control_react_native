import styled from "styled-components/native";

export const Release = styled.TouchableOpacity`
    justify-content: center;
    padding: 10px;
    height: 40px;
    background-color: #262A34;
    border: 1px solid #333334;
    border-radius: 5px;
    margin: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TextRelease = styled.Text`
    color: #C8CACE;
`

export const ItemCheck = styled.TouchableOpacity`
width: 22px;
height: 22px;
border-radius: 12px;
border: 5px solid #D0D0D3;
margin-right: 10px;
background-color: ${props => props.check ? "#333334" : "#D0D0D3"};
`