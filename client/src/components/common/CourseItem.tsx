import {Icon, Text} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

interface Props {
    name:string;
    handleRemove: (courseId:string)=> void;
    courseId: string;
}

export const CourseItem = ({name, handleRemove, courseId}: Props) => (
    <>
        <Text mr="15px">{name}</Text>
        <Icon as={CloseIcon}
              cursor="pointer"
              top="3" right="3"
              w={4} h={4} p="2px"
              position="absolute"
              _hover={{ color: "red.400" }}
              borderRadius="8px"
              onClick={()=>handleRemove(courseId)}
        />
    </>
)