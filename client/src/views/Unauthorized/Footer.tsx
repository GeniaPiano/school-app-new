import {Button, ButtonGroup, Link} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import {useAppInfo} from "../../providers/AppInfoProvider";
import {AiFillGithub} from "react-icons/ai";

export const Footer = () => {

    const {onOpen} = useAppInfo()
        return (
            <ButtonGroup>
                <Button as={Link} variant="outline" colorScheme="gray"  mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}
                        href="https://github.com/GeniaPiano/school-app-new"
                        isExternal>
                    See the code <AiFillGithub/>
                </Button>
                <Button variant="outline" onClick={onOpen} colorScheme="gray" mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
                    Open info <InfoOutlineIcon/>
                </Button>
            </ButtonGroup>
        )
}