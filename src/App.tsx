import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";
import { GenericModal } from "./components/Modal/GenericModal";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}