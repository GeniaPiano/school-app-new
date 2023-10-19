import {Button, ModalBody, ModalFooter,  Text, } from "@chakra-ui/react";
import {FormField} from "../FormField/FormField";
import {SelectForm} from "../FormSelect/SelectForm";
import {HeaderCourseInfo} from "./HeaderCourseInfo";
import {SelectPrice} from "../courseForm/SelectPrice";
import {SelectPhotoUrl} from "../courseForm/SelectPhotoUrl";
import {ChangeEvent} from "react";
import {CourseEntity} from "../../types/course";
import {TeacherEntity} from "../../types/teacher";
import {CourseDescription} from "../courseForm/CourseDescription";

interface Props {
    course: CourseEntity,
    handleInputChange: (e) => void;
    handleSelectChange: (e) => void;
    teachers: TeacherEntity[];
    selectTeacher: string | null;
    handleSubmit: (e) => Promise<void>;
    message: string;
    cancelEditing: () => void;
    name: string;
    description: string;
    handleDescription: (e:ChangeEvent<HTMLTextAreaElement>)=> void;
    price: string;
    handleSelectPrice: (newPrice: string) => void
    photoUrl: string;
    handleSelectPhotoUrl: (url: string) => void;
}

export const UpdateCourseForm = ({course,
                                     name,
                                     handleInputChange,
                                     handleSelectChange,
                                     teachers,
                                     selectTeacher,
                                     handleSubmit,
                                     message,
                                     cancelEditing,
                                     description,
                                     handleDescription,
                                     handleSelectPrice,
                                     price,
                                     photoUrl,
                                     handleSelectPhotoUrl  }: Props) => {
           return (
                <>
                  <HeaderCourseInfo title={course.name}/>
                    <ModalBody color="Gray">
                        <form>
                            <FormField value={name}
                                       onChange={handleInputChange}
                                       name="name"
                                       type="text"
                                       errorMessage="Name is required and must contain from 2 to 40 chars."
                                       error={course.name.length < 3}
                                       label="Course name"
                            />
                            <CourseDescription description={description} handleDescription={handleDescription}/>
                            <SelectForm isTeacher={true}
                                        label="Teacher"
                                        handleChange={handleSelectChange}
                                        data={teachers}
                                        placeholder="Select/change teacher"
                                        value={selectTeacher}
                            />
                            <SelectPrice initialPrice={String(price)} handleSelectPrice={handleSelectPrice}/>
                            <SelectPhotoUrl photoUrl={photoUrl} handleSelectPhotoUrl={handleSelectPhotoUrl}/>

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