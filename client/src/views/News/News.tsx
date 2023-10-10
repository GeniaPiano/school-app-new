import {
    Box,
    Image,
    Flex,
    Heading,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Text,
    Button,
    Spinner,
    SimpleGrid
} from "@chakra-ui/react";


import axios from 'axios';
import { useEffect, useState } from 'react';


interface AllArticles {
    allArticles : Article[] | []
}

interface Article {
    title: string;
    content: string;
    image: {url: string}
}

export const News = () =>  {

    const [articles, setArticles] = useState<Article[] | []>([]);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async ()=> {
           try {
               setLoading(true)
               const res = await
                   axios
                       .post(
                           'https://graphql.datocms.com/',
                           {
                               query: `
            {
              allArticles {
                title
                category
                content
                description
                image {
                  url
                }
              }
            }
          `
                           },
                           {
                               headers: {
                                   Authorization: `Bearer b15fa86fc636fb281b1b844ebcc6c9`,

                               },
                           }
                       )
               const results: AllArticles = res.data.data
               setArticles(results.allArticles)
               setLoading(false)

           } catch (err) {
               if (err.message === 'Network Error') {
                   setError('Cannot fetch data from CMS')
                   console.log(err.message)
               }} finally {
               setLoading(false)
           }
            })();
    }, []);

    if(loading) {
        return <Spinner/>
    }


    return (
        <Flex color="gray.500" h="95vh" mt="2.5vh" flexDir="column" mb="5em">
            <Box >

                <Heading mr={30}
                         color="gray.500"
                         m="20px 0 30px"
                         fontWeight="400"
                         fontSize="xx-large"
                         as="h1"> News </Heading>
                {error && <p>Cannot connect to Data CMS.</p>}

                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4} my={5}>
                    <>
                        {articles ? articles.map((article) => (
                                <Card key={article.title} mb={5}>

                                    <CardBody>
                                        <>{article.image && <Image
                                            src={article.image.url}
                                            alt="photo"
                                            borderRadius='lg'
                                        />} </>

                                        <Stack mt='6' spacing='3'>
                                            <Heading size="md" color="brand.800"> {article.title} </Heading>
                                            <Text color="gray.500"> {article.content} </Text>
                                        </Stack>
                                    </CardBody>
                                    <CardFooter>
                                        <Button variant='solid' colorScheme='teal'>
                                            See more...
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                            :  <p>No artircles.</p>
                        }
                    </>
                </SimpleGrid>






            </Box>

        </Flex>
    )
}


