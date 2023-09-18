import {FC} from "react";
import {ErrorProvider} from "./ErrorProvider";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {colors, components} from "../assets/style/theme";
import {CounterProvider} from "./CounterPovider";
import {NavSizeProvider} from "./NavSizeProvider";
import {PostingDataProvider} from "./PostingDataProvider";
import {CourseInfoProvider} from "./CourseProvider";
import {SearchProvider} from "./SearchProvider";


const theme = extendTheme({colors, components})


export const AllProviders: FC = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <ErrorProvider>
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
              </ErrorProvider>
        </ChakraProvider>
    );
};