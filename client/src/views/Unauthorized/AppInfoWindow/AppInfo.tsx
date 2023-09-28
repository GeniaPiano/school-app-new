import {Badge, Text} from "@chakra-ui/react";


export const AppInfo = () => {
    return (
        <>
            <Text textAlign="justify">
                The application is powered by a <Badge colorScheme="pink">Node.js </Badge> backend  and <Badge colorScheme="pink">Express.js </Badge> to handle routing and create RESTful API. It is integrated with <Badge colorScheme="pink">SQL database </Badge> as well as <Badge colorScheme="pink">GraphQL</Badge> for fetching data from Dato CMS. The frontend is built in <Badge colorScheme="pink">React</Badge>  and <Badge colorScheme="pink">Chakra UI</Badge> has been used for styling.
                <Badge colorScheme="pink">TypeScript </Badge>  is used both in the frontend and backend.
            </Text>
        </>
    );
}