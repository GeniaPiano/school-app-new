import {useState} from "react";
import {Box, Button, Center, Flex, HStack, Text} from "@chakra-ui/react";
import {FormField} from "../../components/FormField/FormField";
import {useAuth} from "../../hooks/useAuth";
import {useError} from "../../providers/ErrorProvider";
import {ErrorText} from "../../components/common/ErrorText";
import {handleInputChange, initialLoginInputTouch, initialLoginValues} from "./helper";

interface Props {
    toggleRegister: ()=> void;
}



export const Login = ({ toggleRegister}:Props) => {

    const {signIn} = useAuth()
    const {error} = useError()
    const [inputValues, setInputValues] = useState (initialLoginValues)
    const [touchCount, setTouchCount] = useState(initialLoginInputTouch)



    const isErrorLogin = touchCount.email > 4 && (inputValues.email.length < 4 || inputValues.email.length > 40 || !inputValues.email.includes('@'))
    const isErrorPassword = touchCount.password > 4 && (inputValues.password.length < 4 || inputValues.password.length > 40)

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signIn(inputValues.email, inputValues.password)
        setTouchCount(initialLoginInputTouch)
        setInputValues(initialLoginValues)
    }


    return (
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             width="100%"
             height="100vh"
             bg="gray.100"
        >

            <Flex alignItems="center" justifyItems="center" height="100vh">

                <Center
                    as="form"
                    onSubmit={handleSubmit}
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
                    borderRadius='15px' p={{base:"80px 50px", md: "100px 70px", lg: "120px 100px"}} bg="gray.50"
                    flexDirection="column"
                    maxWidth="600px"  >

                    <FormField name="email"
                               errorMessage='Login is required and must contain from 4 to 40 characters.'
                               label= "Login"
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
                            bg="brand.800"
                            color="whitesmoke"
                            _hover={{bg: "teal.600"}}
                            mt={5} > sign in </Button>
                    <HStack mt={2}>
                        <Text color="gray.500"> need an account? </Text>
                        <Text onClick={toggleRegister} color="pink.400" cursor='pointer' _hover={{color: "pink.500", fontWeight: "500"}}>
                            register
                        </Text>
                    </HStack>

                    <Text  color="teal.600"
                           fontSize="s"
                           mt={10}>

                        Click sign-in button and try <br/>DEMO VERSION as Admin.
                    </Text>
                </Center>

            </Flex>
        </Box>
    )
}
