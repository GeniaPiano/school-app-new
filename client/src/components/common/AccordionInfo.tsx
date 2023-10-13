import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";

interface Props {
    info: string;
}
export const AccordionInfo = ({info}: Props) => {
    return (
        <Accordion allowToggle >
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            info
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} width='100%'>
                    { info ? info  : 'coming soon...'}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
