import {Flex, Radio, RadioGroup, Stack, Text} from "@chakra-ui/react";
import {prices} from "./prices";
import {useEffect, useState} from "react";

interface Props {
    price?: string;
    handleSelectPrice: (price:string)=> void;
    initialPrice?: string;
}

export const SelectPrice = ({initialPrice, handleSelectPrice}: Props) => {

    const [price, setPrice] = useState(initialPrice);
    const handlePriceChange = (newPrice: string) => {
        setPrice(newPrice);
        handleSelectPrice(newPrice);
    };
    useEffect(() => {
        setPrice(initialPrice);
    }, [initialPrice]);
    return (
        <RadioGroup
            value={String(price)} mb={5}>
            <Text mb='8px' fontWeight="500" >Select price</Text>
            <Stack direction='row' spacing={5}>
                {prices.map(priceItem => (
                    <label key={priceItem}>
                        <Radio value={priceItem} colorScheme='teal' display="none"/>
                        <Flex cursor="pointer" align="center" justifyContent="center"
                              _hover={{border: "2px solid orange"}}
                              border={price === priceItem ? "3px solid teal" : "2px solid transparent"}
                              boxShadow={price === priceItem ? "dark-lg" : "md"}
                              borderRadius='md'
                              height="40px"
                              width="40px"
                              onClick={() => handlePriceChange(priceItem)}
                        >{priceItem}</Flex>
                    </label>
                ))}
            </Stack>
        </RadioGroup>
    )
}
