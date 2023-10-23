import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,HStack, Box, Flex, Text} from "@chakra-ui/react";
import {RateCourseWithAuthor} from "../../types/rateCourse";
import {StarsRateAverage} from "../StarsRateAverage/StarsRateAverage";
import {averageRateCourse} from "../../utils/averageRateCourse";
import {StarsRate} from "../StarsRate/StarsRate";
import {useEffect, useState} from "react";
import {useCourses} from "../../hooks/useCourses";

interface Props {
    info: string;
    courseId: string;

}
export const AccordionDescriptionAndRates = ({info, courseId}: Props) => {
    const {getOneAllDetails} = useCourses();
    const [rates, setRates] = useState<RateCourseWithAuthor[] | []>([])
    useEffect(() => {
        (async () => {
            const ratesRes = await getOneAllDetails(courseId);
            setRates(ratesRes.rates)
        })()
    },[courseId, getOneAllDetails])

    const average = averageRateCourse(rates)
    return (
        <Accordion allowToggle >
            <AccordionItem>
                 <h2>
                    <AccordionButton>
                        <HStack as="span" flex='1' textAlign='left' spacing={5}>
                            <Text>{typeof average === 'string' ? average : average.toFixed(2)}</Text>
                            <StarsRateAverage average={average}/>
                        </HStack>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} width='100%'>
                    {rates.length > 0
                        ? rates.map(rate => (
                            <Flex key={rate.id} justifyContent="space-between">
                                <Text> {rate.authorName} </Text>
                                <StarsRate stars={rate.stars}/>

                            </Flex>
                        )
                    ) : 'Course is not rated yet.' }
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            info
                        </Box>
                       <AccordionIcon/>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} width='100%'>
                    { info ? info  : 'coming soon...'}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
