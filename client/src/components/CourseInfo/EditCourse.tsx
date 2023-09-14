import {Button, ModalBody, ModalFooter, ModalHeader, Text} from "@chakra-ui/react";
import {FormField} from "../FormField/FormField";
import {SelectForm} from "../FormSelect/SelectForm";

export const EditCourse = ({courseName, name, handelInputChange, handleSelectChange, teachers, selectTeacher, handleSubmit, message, cancelEditing}) => {
    return (

        <>
            <ModalHeader color="teal"> {courseName} </ModalHeader>
            <ModalBody color="Gray">
                <form>
                    <FormField value={name}
                               onChange={handelInputChange}
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