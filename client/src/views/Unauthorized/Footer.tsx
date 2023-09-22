import {Button, HStack, Link} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import {useAppInfo} from "../../providers/AppInfoProvider";
import {AiFillGithub} from "react-icons/ai";

export const Footer = () => {

    const {onOpen} = useAppInfo()
        return (
            <HStack>
                <Button as={Link} colorScheme="gray"  mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}
                        href="https://github.com/GeniaPiano/school-app-new"
                        isExternal>
                    See the code <AiFillGithub/>
                </Button>
                <Button onClick={onOpen} colorScheme="gray" mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
                    Open info <InfoOutlineIcon/>
                </Button>
            </HStack>
        )
}