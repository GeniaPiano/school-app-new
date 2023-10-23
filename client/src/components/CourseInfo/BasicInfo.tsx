import {
    Accordion,
    AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel,
    Badge, Flex,Box,
    Button,
    HStack,
    ModalBody,
    ModalFooter,
    Text
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'
import {firstLetterToUpper} from "../../utils/firstLetterToUpper";
import {useCourseInfo} from "../../providers/CourseProvider";
import {GetSingleCourseResponse} from "../../types/course";
import {HeaderCourseInfo} from "./HeaderCourseInfo";
import {averageRateCourse} from "../../utils/averageRateCourse";
import {StarsRateAverage} from "../StarsRateAverage/StarsRateAverage";
import {StarsRate} from "../StarsRate/StarsRate";



interface Props {
    courseData: GetSingleCourseResponse;
}
export const BasicInfo = ({courseData }: Props) => {

    const {changeIsEditing, changeIsDelete, closeModal} = useCourseInfo();
    const average = averageRateCourse(courseData.rates)
    const navigate = useNavigate();
    const handleNavigate = () => {
        closeModal();
        navigate(`/courses/${courseData.id}`)
    }


    return (
        <>
            <HeaderCourseInfo title={courseData?.name}/>
            <ModalBody>
                <HStack mb={2}>
                    <Badge colorScheme="pink" mr={2}>Number of students </Badge>
                    <Text> {courseData && courseData.countStudents} </Text>
                </HStack>
                <HStack mb={10}>
                    <Badge colorScheme="pink" mr={50}>Teacher name </Badge>
                    <Text> {!(courseData) || courseData.teacher !== null
                        ? `${firstLetterToUpper("teacher" in courseData ? courseData.teacher.name : '')} ${firstLetterToUpper(courseData.teacher.last_name)}`
                        : 'not assigned'} </Text>
                </HStack>
                <HStack>
                    {courseData.rates.length === 0  && (
                       <>  <Text  mr={20}>Rate:  {typeof average === 'string' ? average : average.toFixed(2)} </Text>
                           <StarsRateAverage average={average}/> </>
                    )}
                    {courseData.rates.length > 0 && (
                        <>
                            <Accordion allowMultiple>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <HStack as="span" flex='1' textAlign='left'>

                                                <Text mr={4}>Rate:  {typeof average === 'string' ? average : average.toFixed(2)} </Text>
                                                <AccordionIcon mr={20} />
                                                <StarsRateAverage average={average}/>
                                            </HStack>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} >
                                        {courseData.rates.map(rate=> (
                                           <Box my={10}> <Flex  key={rate.id} justifyContent="space-between">
                                                <Text>{rate.authorName}</Text>
                                                <StarsRate stars={rate.stars}/>
                                            </Flex>
                                               {rate.opinion  && <Text color='teal.500'  fontSize="xs" >{rate.opinion}</Text>}
                                           </Box>
                                        ))}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </>
                    )}
                     </HStack>


            </ModalBody>
            <ModalFooter>
                <Button onClick={handleNavigate} colorScheme='teal' mr={10}>See student list</Button>
                <Button color="gray.600" mr={3} onClick={()=> changeIsEditing(true)}>Edit</Button>
                <Button  color="pink.500" onClick={()=> changeIsDelete(true)}>Delete</Button>
            </ModalFooter>

        </>
    )
}