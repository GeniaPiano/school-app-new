import {StudentEntity} from "../../types/student";
import {Flex, Icon, ListItem, Button, Text, useDisclosure, Heading, Box} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from '@chakra-ui/react'
import {useState} from "react"





export const StudentsListItem = ({studentData}) => {
    const {student, selectedCourses} = studentData
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);


    return (
        <ListItem>
            <Flex justifyContent="space-between"
                  _hover={{color: "brand.700"}}
                  cursor="pointer"
                  my={2}
                  onClick={onOpen}>
                <Text>{student.name} {student.last_name}</Text>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color="gray.500">
                    <ModalHeader>{student.name} {student.last_name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       <Flex flexDir="column"
                       my={4}>
                           <Heading as="h3" size="sm" fontWeight="500" >courses:</Heading>
                           {selectedCourses.map(course => <p key={course.id}> {course.name}</p>)}
                       </Flex>
                        <Box>
                            <Heading as="h3" size="sm" fontWeight="500" >email:</Heading>
                            <p>{student.email}</p>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>{isEditing ? 'Save' : 'Edit'}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ListItem>
    )
}