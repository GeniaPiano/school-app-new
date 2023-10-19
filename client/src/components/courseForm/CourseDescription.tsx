import {Box, Text, Textarea} from "@chakra-ui/react";
import {ChangeEvent} from "react";


interface Props {
    description: string;
    handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export const CourseDescription = ({description, handleDescription}: Props) => {

    return (
        <Box>
            <Text mb='8px' fontWeight="500" > Description </Text>
            <Textarea
                mb={4}
                name='description'
                value={description}
                onChange={handleDescription}
                placeholder='2000 chars maximum'
                size='sm'
            />
        </Box>
    )
}