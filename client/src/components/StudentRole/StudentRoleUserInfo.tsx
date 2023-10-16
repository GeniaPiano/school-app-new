import {Card, CardBody, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import {StudentEntity} from "../../types/student";

interface Props {
    user: StudentEntity;
}

export const StudentRoleUserInfo = ({user}: Props) => {
    const bgCard ='brand.600'
    return (
        <Card
            py={10}
            bg={bgCard}
            color="gray"
            minWidth="200px">
            <CardHeader as={Flex} justifyContent="space-between" color="gray.600" fontWeight="500" fontSize="larger">
                <Heading as="h3" size='s'>{user.name} {user.last_name}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{user.email}</Text>
            </CardBody>
        </Card>
    )
}