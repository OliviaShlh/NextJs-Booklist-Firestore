"use client";

import React, { useState } from "react";
import { Box, chakra, Flex, Stack, Button, Heading, ModalOverlay, useDisclosure, ModalContent, ModalCloseButton, ModalFooter, Modal, ChakraProvider, SimpleGrid, GridItem, FormControl, FormLabel, Input, Link } from "@chakra-ui/react";
import "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/cloudfirestore";


const TampilanAwal = () => {
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [published, setPublished] = useState<number | string>("");
  const [pages, setPages] = useState<number | string>("");



  const handleSave = async () => {
    const publishedInput = typeof published === "number" ? published : parseInt(published, 10);
    const pagesInput = typeof pages === "number" ? pages : parseInt(pages, 10);

    if (!title || !author || isNaN(publishedInput) || isNaN(pagesInput)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const bookData = {
      Title: title,
      Author: author,
      Published: publishedInput,
      Pages: pagesInput,
    };

    try {
      const docRef = await addDoc(collection(db, "Books"), bookData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    onClose();

    window.location.href="/List"

  };

  return (
    <chakra.header>
      <Box w="full" h="100vh" backgroundImage="url(https://th.bing.com/th/id/OIP.UQMhiPDxqtRNaLnHvtwn2QHaEo?pid=ImgDet&rs=1)" bgPos="center" bgSize="cover">
        <Flex align="center" pos="relative" justify="center" boxSize="full" bg="blackAlpha.700">
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading fontSize={{ base: "2xl", md: "4xl" }} fontFamily="Harry Potter Font, cursive" textShadow="2px 2px 4px #000" fontWeight="semibold" color="#B8860B" textTransform="uppercase">
              let's register the books you've read here
            </Heading>
            <Button
              colorScheme="red"
              textColor={"black"}
              fontWeight="bold"
              textTransform="uppercase"
              w="fit-content"
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              Start
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ChakraProvider>
            <Box
              bg="#B8860B"
              _dark={{
                bg: "#111",
              }}
              p={10}
            >
              <Box mt={[10, 0]}>
                <SimpleGrid
                  display={{
                    base: "initial",
                    md: "grid",
                  }}
                  columns={{
                    md: 3,
                  }}
                  spacing={{
                    md: 6,
                  }}
                  w={550}
                >
                  <GridItem
                    mt={[5, null, 0]}
                    colSpan={{
                      md: 2,
                    }}
                  >
                    <chakra.form
                      method="POST"
                      shadow="base"
                      rounded={[null, "md"]}
                      overflow={{
                        sm: "hidden",
                      }}
                    >
                      <Stack
                        px={4}
                        py={5}
                        p={[null, 6]}
                        bg="white"
                        _dark={{
                          bg: "#141517",
                        }}
                        spacing={6}
                      >
                        <SimpleGrid columns={6} spacing={6}>
                          <FormControl as={GridItem} colSpan={6}>
                            <FormLabel
                              htmlFor="street_address"
                              fontSize="sm"
                              fontWeight="md"
                              color="gray.700"
                              _dark={{
                                color: "gray.50",
                              }}
                            >
                              Title
                            </FormLabel>
                            <Input
                              type="text"
                              name="street_address"
                              id="street_address"
                              autoComplete="street-address"
                              mt={1}
                              focusBorderColor="brand.400"
                              shadow="sm"
                              size="sm"
                              w="full"
                              rounded="md"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormControl>

                          <FormControl as={GridItem} colSpan={[6, 4]}>
                            <FormLabel
                              htmlFor="email_address"
                              fontSize="sm"
                              fontWeight="md"
                              color="gray.700"
                              _dark={{
                                color: "gray.50",
                              }}
                            >
                              Author
                            </FormLabel>
                            <Input
                              type="text"
                              name="email_address"
                              id="email_address"
                              autoComplete="email"
                              mt={1}
                              focusBorderColor="brand.400"
                              shadow="sm"
                              size="sm"
                              w="full"
                              rounded="md"
                              value={author}
                              onChange={(e) => setAuthor(e.target.value)}
                            />
                          </FormControl>

                          <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel
                              htmlFor="first_name"
                              fontSize="sm"
                              fontWeight="md"
                              color="gray.700"
                              _dark={{
                                color: "gray.50",
                              }}
                            >
                              Published
                            </FormLabel>
                            <Input
                              type="text"
                              name="first_name"
                              id="first_name"
                              autoComplete="given-name"
                              mt={1}
                              focusBorderColor="brand.400"
                              shadow="sm"
                              size="sm"
                              w="full"
                              rounded="md"
                              value={published}
                              onChange={(e) => setPublished(e.target.value)}
                            />
                          </FormControl>

                          <FormControl as={GridItem} colSpan={[6, 3]}>
                            <FormLabel
                              htmlFor="last_name"
                              fontSize="sm"
                              fontWeight="md"
                              color="gray.700"
                              _dark={{
                                color: "gray.50",
                              }}
                            >
                              Pages
                            </FormLabel>
                            <Input
                              type="text"
                              name="last_name"
                              id="last_name"
                              autoComplete="family-name"
                              mt={1}
                              focusBorderColor="brand.400"
                              shadow="sm"
                              size="sm"
                              w="full"
                              rounded="md"
                              value={pages}
                              onChange={(e) => setPages(e.target.value)}
                            />
                          </FormControl>
                        </SimpleGrid>
                      </Stack>
                    </chakra.form>
                  </GridItem>
                </SimpleGrid>
              </Box>
            </Box>
          </ChakraProvider>
          <ModalFooter>
            <Button onClick={handleSave} color="#B8860B">
              save
            </Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </chakra.header>
  );
};

export default TampilanAwal;
