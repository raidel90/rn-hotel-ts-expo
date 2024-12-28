import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertDisplayContainer } from '../alerts/AlertDisplayContainer';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { useMockServer } from '../mock-server';
import { EmployeeContainer } from './EmployeeContainer';
import { StoreContainer } from './StoreContainer';

const combinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const combinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? combinedDarkTheme : combinedDefaultTheme;

  useMockServer();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContainer>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <EmployeeContainer>
              <AlertDisplayContainer>
                {children}
                <StatusBar style="auto" />
              </AlertDisplayContainer>
            </EmployeeContainer>
          </NavigationContainer>
        </PaperProvider>
      </StoreContainer>
    </QueryClientProvider>
  );
};