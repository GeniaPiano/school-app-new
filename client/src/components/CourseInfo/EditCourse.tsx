import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Text, useDisclosure} from "@chakra-ui/react";
import {FormField} from "../FormField/FormField";
import {SelectForm} from "../FormSelect/SelectForm";
import {HeaderCourseInfo} from "./HeaderCourseInfo";
import {useCourseInfo} from "../../providers/CourseProvider";

export const EditCourse = ({courseName, name, handleInputChange, handleSelectChange, teachers, selectTeacher, handleSubmit, message, cancelEditing}) => {


    const {onClose, isOpen, onOpen} = useDisclosure()

    return (

        <>
          <HeaderCourseInfo title={courseName}/>
            <ModalBody color="Gray">
                <form>
                    <FormField value={name}
                               onChange={handleInputChange}
                               name="name"
                               type="text"
                               errorMessage="Name is required and must contain from 2 to 40 chars."
                               error={name.length < 3}
                               label="Course name"
                    />
                    <SelectForm isTeacher={true}
                                label="Teacher"
                                handleChange={handleSelectChange}
                                data={teachers}
                                placeholder="Select/change teacher"
                                value={selectTeacher}
                    />
                </form>
                {message && <Text color='blue'>{message}</Text>}

            </ModalBody>
            <ModalFooter>
                <Button color="gray.600" mr={3} onClick={cancelEditing}>Cancel</Button>
                <Button color="gray.600" onClick={handleSubmit}>Save</Button>
            </ModalFooter>



        </>
    )
}