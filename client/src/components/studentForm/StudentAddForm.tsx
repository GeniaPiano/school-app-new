import {
    FormControl, FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Select, SelectField
} from "@chakra-ui/react";
import {userFormData} from "../../utils/userFormData";
import {FormField} from "../FormField/FormField";
import {ChangeEvent, useEffect, useState} from "react";
import {initialStateTouchCount} from "../../utils/initialState";
import {errorDataAddUser} from "../../utils/errorDataAddUser";
import {CourseEntity, CourseId} from "../../types/course";
import {useCourses} from "../../hooks/useCourses";
import {ChosenCourses} from "../ChosenCourses/ChosenCourses";
import {SelectForm} from "../FormSelect/SelectForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const StudentAddForm = ({isOpen, onClose}: Props) => {

    const {getAllCourses} = useCourses()

    const [inputValues, setInputValues] = useState({
        name: '',
        last_name: '',
        email: '',
    })

    const [availableCourses, setAvailableCourses] = useState<CourseEntity[] | []>([])
    const [selectedCourses, setSelectedCourses] = useState<CourseEntity[] | []>([])

    const [inputTouchedCount, setInputTouchedCount] = useState(initialStateTouchCount);

    useEffect(()=> {
        (async() => {
            const res = await getAllCourses();
            setAvailableCourses(res)
            console.log(res)
        })()
    }, [])



    const handleInputChange = (e) => {
        setInputValues(prev => ({
                ...prev,
                [e.target.name] : e.target.value
        }))
        setInputTouchedCount(prev => ({
            ...prev,
            [e.target.name]: prev[e.target.name] + 1,
        }));
    }

     const handleSelectChange = (e : ChangeEvent<HTMLInputElement>) => {
        const courseId = e.target.value;
        const courseToAdd = availableCourses.find(course => course.id === courseId)
        setSelectedCourses(prevState => [...prevState, courseToAdd])
        setAvailableCourses(prev => prev.filter(course => course.id !== courseId))
            }

    const handleRemoveCourse = (courseId: string) => {
        const course = selectedCourses.find(course => course.id === courseId)
        setSelectedCourses(prevSelectedCourses => prevSelectedCourses.filter(course => course.id !== courseId));
        setAvailableCourses(prev => ([...prev, course]))
    };


    const isError = errorDataAddUser(inputTouchedCount, inputValues);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent  color="gray.500">
                <ModalCloseButton/>
                <ModalHeader>Add new student to </ModalHeader>

                <ModalBody>
                    <form>
                       {userFormData.map(oneForm => (
                            <FormField
                                key={oneForm.title}
                                type={oneForm.type}
                                name={oneForm.name}
                                label={oneForm.title}
                                value={inputValues[oneForm.name]}
                                onChange={handleInputChange}
                                errorMessage={oneForm.errorMessage}
                                error={isError[oneForm.name]}
                            />
                        ))}
                        <SelectForm label="Courses" data={availableCourses} handleChange={handleSelectChange} placeholder="Select course/courses."/>
                    </form>
                    <ChosenCourses data={selectedCourses} handleRemove={handleRemoveCourse} />
                </ModalBody>

                <ModalFooter>footer </ModalFooter>
            </ModalContent>
        </Modal>
    )
}