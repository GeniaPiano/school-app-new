import {Box, Button, Center, Flex, Heading, HStack, Text} from "@chakra-ui/react";
import {FormField} from "../../components/FormField/FormField";
import {ErrorText} from "../../components/common/ErrorText";
import {useError} from "../../providers/ErrorProvider";
import {useState} from "react";
import {
    handleInputChange,
    initialRegisterInputTouchCount,
    initialRegisterInputValues
} from "./helper";
import {useAuth} from "../../hooks/useAuth";

interface Props {
    toggleRegister: ()=> void;
}

export const Register = ({toggleRegister}: Props) => {


    const {error} = useError()
    const {register} = useAuth();
    const [matchPassword, setMatchPassword] = useState('')
    const [inputValues, setInputValues] = useState (initialRegisterInputValues)
    const [touchCount, setTouchCount] = useState(initialRegisterInputTouchCount)
    const isErrorLogin = touchCount.email > 4 && (inputValues.email.length < 4 || inputValues.email.length > 40 || !inputValues.email.includes('@'))
    const isErrorPassword = touchCount.password > 5 && (inputValues.password.length < 5 || inputValues.password.length > 40)
    const isErrorPasswordConfirm = touchCount.passwordConfirm > 5 && (inputValues.passwordConfirm.length < 5 || inputValues.passwordConfirm.length > 40)

    const handleRegister = async(e) => {
         e.preventDefault()
        if (inputValues.email === '') {
            setTouchCount(prev => ({
                ...prev,
                email: 5
            }))
        }
        if (inputValues.password === '') {
            setTouchCount(prev => ({
                ...prev,
                   password : 6,
            }))
        }
        if (inputValues.passwordConfirm === '') {
            setTouchCount(prev => ({
                ...prev,
                passwordConfirm : 6,
            }))
        }
        if (inputValues.password !== inputValues.passwordConfirm) {
            setMatchPassword('Password and confirm password value must be the same. ')
            setTimeout(()=> {
                setMatchPassword('')
            }, 2000)
        }

       const response = await register(inputValues.email, inputValues.password, inputValues.passwordConfirm)
       if (response.success) {
            toggleRegister()
        }
    }

    return (
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             width="100%"
             height="100vh"
             bg="gray.100"
             pt={20}
        >

            <Flex alignItems="center" justifyItems="center" height="100vh" flexDirection="column">

                <Center
                    as="form"
                    onSubmit={handleRegister}
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.09)"
                    borderRadius='15px'
                    p={{base:"60px 50px", md: "70px 70px"}}
                    bg="gray.50"
                    flexDirection="column"
                    maxWidth="600px"  >
                    <Heading mb={5} as="h4" color="teal.600" size="md">Register</Heading>

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

                    <FormField name="passwordConfirm"
                               errorMessage='Password confirm is required and must be the same like password.'
                               label="Confirm password"
                               type="password"
                               value={inputValues.passwordConfirm}
                               onChange={e=> handleInputChange(e, setInputValues, setTouchCount)}
                               error={isErrorPasswordConfirm}
                    />

                    {error && <ErrorText text={error}/>}
                    {matchPassword && <ErrorText text={matchPassword}/>}

                    <Button
                            type="submit"
                            px={20}
                            bg="brand.800"
                            color="whitesmoke"
                            _hover={{bg: "teal.600"}}
                            mt={5} > register </Button>
                    <HStack mt={2}>
                        <Text color="gray.500"> Already have an account </Text>
                        <Text onClick={toggleRegister} color="myPink.700" cursor='pointer' _hover={{color: "pink.500", fontWeight: "500"}}>
                            sign in
                        </Text>
                    </HStack>
                </Center>
             </Flex>
        </Box>
    )
}