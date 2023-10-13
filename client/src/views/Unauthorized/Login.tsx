import {useState} from "react";
import {
    Box,
    Button,
    Center,
    Heading,
    Flex,
    HStack,
    Text, useColorModeValue
} from "@chakra-ui/react";
import {FormField} from "../../components/FormField/FormField";
import {useAuth} from "../../hooks/useAuth";
import {useError} from "../../providers/ErrorProvider";
import {ErrorText} from "../../components/common/ErrorText";
import {
    demoAdminValues,
    demoStudentValues,
    handleInputChange,
    initialLoginInputTouch,
    initialLoginValues
} from "./helper";
import {AppInfoWindow} from "./AppInfoWindow/AppInfoWindow";
import {useAppInfo} from "../../providers/AppInfoProvider";
import {Footer} from "./Footer";
import {ChangeColorModeBtn} from "../../components/ChangeColorModeBtn/ChangeColorModeBtn";


interface Props {
    toggleRegister: ()=> void;
}





export const Login = ({ toggleRegister}:Props) => {

    const {signIn} = useAuth()
    const {error} = useError()
    const [inputValues, setInputValues] = useState (initialLoginValues)
    const [touchCount, setTouchCount] = useState(initialLoginInputTouch)
    const {isOpen, onClose} = useAppInfo()


    const isErrorLogin = touchCount.email > 4 && (inputValues.email.length < 4 || inputValues.email.length > 40 || !inputValues.email.includes('@'))
    const isErrorPassword = touchCount.password > 4 && (inputValues.password.length < 4 || inputValues.password.length > 40)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await signIn(inputValues.email, inputValues.password)
        if (res.success) {
            setTouchCount(initialLoginInputTouch)
            setInputValues(initialLoginValues)
        }
    }

    const handleLogin = async(values) => {
        await signIn(values.email, values.password)
    }

    return (
       <>
        <ChangeColorModeBtn/>
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             width="100%"
             height="100vh"
             pt={20}
        >


            <Flex alignItems="center"
                  justifyItems="center"
                  height="100vh"
                  flexDirection="column">


                <Center
                    bg={useColorModeValue('gray.300', 'gray.600')}
                    as="form"
                    onSubmit={handleSubmit}
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
                    borderRadius='15px'
                    p={{base:"60px 50px", md: "70px 70px"}}
                    // bg="gray.50"
                    flexDirection="column"
                    maxWidth="600px"  >
                    <Heading mb={5} as="h4" color="teal.600" size="md">Login</Heading>
                    <FormField name="email"
                               errorMessage='Login is required and must contain from 4 to 40 characters.'
                               label= "Email"
                               value={inputValues.email}
                               type="email"
                               onChange={e=> handleInputChange(e, setInputValues, setTouchCount)}
                               error={isErrorLogin}
                    />


                    <FormField name="password"
                               errorMessage='Password is required must contain from 4 to 40 characters.'
                               label="Password"
                               type="password"
                               value={inputValues.password}
                               onChange={e=> handleInputChange(e, setInputValues, setTouchCount)}
                               error={isErrorPassword}
                    />

                    {error && <ErrorText text={error}/>}

                    <Button type="submit"
                            px={20}
                            variant="outline"
                            bg="brand.800"
                            color="whitesmoke"
                            _hover={{bg: "teal.600"}}
                            mt={10} > sign in </Button>
                    <HStack my={2}>
                        <Text color="gray.500"> need an account? </Text>
                        <Text onClick={toggleRegister} color="myPink.700" cursor='pointer' _hover={{color: "pink.500", fontWeight: "500"}}>
                            register
                        </Text>
                    </HStack>
                </Center>

                <Box display="flex"
                     flexDirection="column"
                     justifyContent="center"
                     alignItems="center"
                     width="100%"
                >
                <HStack fontSize="md" my={5} fontWeight="500">
                    <ChangeColorModeBtn isDark={true}/>
                    <Text color="myPink.700">TRY DEMO</Text>
                </HStack>
                <Flex flexDirection="column" gap={2}>
                    <Button
                        onClick={()=> handleLogin(demoAdminValues)}
                        colorScheme="teal"
                        variant="outline"
                    >Demo Admin no registration</Button>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={()=> handleLogin(demoStudentValues)}
                    >Demo Student no registration</Button>
                </Flex>

                <Footer/>
                <AppInfoWindow isOpen={isOpen} onClose={onClose} />

                </Box>
            </Flex>
        </Box>




       </>
    )
}
