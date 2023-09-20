import {useState} from "react";
import {Box, Button, Center, Flex, Text} from "@chakra-ui/react";
import {FormField} from "../../components/FormField/FormField";
import {useAuth} from "../../hooks/useAuth";

export const LoginView = () => {

    const {signIn} = useAuth()
    const [inputValues, setInputValues] = useState ({
        login: "admin@admin.com",
        password: 'adminadmin74337'
    })
    const [touchCount, setTouchCount] = useState({
        login: 0,
        password: 0,
    })


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValues(prev => ({
            ...prev,
            [name]: value,
        }))
        setTouchCount(prev => ({
            ...prev,
            [e.target.name]: prev[name] + 1
        }))

    }

    const isErrorLogin = touchCount.login > 4 && (inputValues.login.length < 4 || inputValues.login.length > 40 || !inputValues.login.includes('@'))
    const isErrorPassword = touchCount.password > 4 && (inputValues.password.length < 4 || inputValues.login.length > 40)
    const handleSubmit = async(e) => {
        e.preventDefault();
        await signIn(inputValues.login, inputValues.password)
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
                    maxWidth="400px"  >

                    <FormField name="login"
                               errorMessage='Login is required and must contain from 4 to 40 characters.'
                               label="Login"
                               value={inputValues.login}
                               type='email'
                               onChange={handleInputChange}
                               error={isErrorLogin}
                    />
                    <FormField name="password"
                               errorMessage='Password is required must contain from 4 to 40 characters.'
                               label="Password"
                               type="password"
                               value={inputValues.password}
                               onChange={handleInputChange}
                               error={isErrorPassword}
                    />
                    <Button type="submit"
                            bg="brand.800"
                            color="whitesmoke"
                            _hover={{bg: "teal.600"}}
                            mt={5} px={10}>sign in</Button>
                    <Text  color="teal.600"
                           fontSize="s"
                           mt={8}

                    >
                        Click sign-in button and try <br/>DEMO VERSION as Admin.
                    </Text>
                </Center>

            </Flex>
        </Box>
    )
}
