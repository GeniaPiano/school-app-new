import {Flex, GridItem, Image, Radio, RadioGroup, SimpleGrid, Text} from "@chakra-ui/react";
import {imagesUrls} from "./imagesUrls";


export const SelectPhotoUrl = ({photoUrl, handleSelectPhotoUrl}) => {
    return (
        <RadioGroup onChange={() => handleSelectPhotoUrl(photoUrl)} value={photoUrl} mb={5}>
            <Text mb="5px" fontWeight="500">
                Select a photo
            </Text>
            <Flex direction="row" >
                <SimpleGrid columns={{ base: 6 }} spacing={4} my={5} gap={3}>
                    {imagesUrls.map((url) => (
                        <GridItem key={url}>
                            <label>
                                <Radio value={url} colorScheme="teal" display="none" />
                                <Image
                                    src={url}
                                    height="40px"
                                    width="40px"
                                    border={photoUrl === url ? "3px solid teal" : "2px solid transparent"}
                                    boxShadow={photoUrl === url ? "dark-lg" : "md"}
                                    borderRadius="md"
                                    cursor="pointer"
                                    _hover={{ border: "2px solid orange" }}
                                    onClick={() => handleSelectPhotoUrl(url)}
                                />
                            </label>
                        </GridItem>
                    ))}
                </SimpleGrid>
            </Flex>
        </RadioGroup>
    )
}