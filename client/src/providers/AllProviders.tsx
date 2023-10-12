import {FC} from "react";
import {ErrorProvider} from "./ErrorProvider";
import {ChakraProvider, extendTheme, type ThemeConfig} from "@chakra-ui/react";
import {colors, components} from "../assets/style/theme";
import {CounterProvider} from "./CounterPovider";
import {NavSizeProvider} from "./NavSizeProvider";
import {PostingDataProvider} from "./PostingDataProvider";
import {CourseInfoProvider} from "./CourseProvider";
import {SearchProvider} from "./SearchProvider";
import {AuthProvider} from "../hooks/useAuth";
import {AppInfoProvider} from "./AppInfoProvider";

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true,
}

const theme = extendTheme({colors, components, config})




export const AllProviders: FC = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <ErrorProvider>
             <AppInfoProvider>
              <AuthProvider>
                <SearchProvider>
                  <CourseInfoProvider>
                    <CounterProvider>
                        <NavSizeProvider>
                            <PostingDataProvider>
                                {children}
                            </PostingDataProvider>
                        </NavSizeProvider>
                    </CounterProvider>
                  </CourseInfoProvider>
                </SearchProvider>
              </AuthProvider>
             </AppInfoProvider>
            </ErrorProvider>
        </ChakraProvider>
    );
};