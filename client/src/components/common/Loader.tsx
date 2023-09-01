import {Button} from "@chakra-ui/react";

interface Props {
    loadingText: string;
    colorScheme: string;
}

export const Loader = ({loadingText, colorScheme}:Props) => (
    <Button
        isLoading
        loadingText={loadingText}
        colorScheme={colorScheme}
        variant='outline'
        spinnerPlacement='start'/>
)