"use client";

import { ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, ButtonGroup, IconButton, useColorModeValue, useDisclosure, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase/cloudfirestore";
import { collection, getDocs, DocumentData, setDoc } from "firebase/firestore";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from "@chakra-ui/react";
import { doc, deleteDoc } from "firebase/firestore";

interface Book {
  docId: string;
  Title: string;
  Author: string;
  Published: number;
  Pages: number;
}

function BookList() {
  const [modal, setModal] = useState(false);

  const [books, setBooks] = useState<Book[]>([]);

  const [detail, setDetail] = useState<Book>();

  const [modalEdit, setModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [afterEdit, setAfterEdit] = useState<Book>({
    docId: `${detail?.docId}`,
    Title: "",
    Author: "",
    Published: 0,
    Pages: 0,
  });

  const color2 = useColorModeValue("gray.400", "gray.400");

  let arr: any[] = [];

  const fetchBooks = async () => {
    console.log("running...");
    const booksRef = collection(db, "Books");
    const querySnapshot = await getDocs(booksRef);
    const bookList: Book[] = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "hagdhghdng");
      bookList.push(doc.data() as Book);
      arr.push({ ...doc.data(), docId: doc.id });
      // console.log(arr, "array")
    });

    setBooks([...arr]);

    console.log("book list", bookList);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = (books: Book) => {
    setDetail(books);
    setModal(true);
  };
  console.log(detail, "ini detail buku");

  // Delete Doc
  const Delete = async (id: string) => {
    await deleteDoc(doc(db, "Books", id));
    fetchBooks();
  };

  // menampilkan modal untuk 1 list buku dan lakukan edit
  const Edit = (books: Book) => {
    setDetail(books);
    setModalEdit(true);
  };

  const handleSaveEdit = async () => {
    console.log(afterEdit, "data baru");
    setLoading(true);
    await setDoc(doc(db, "Books", `${detail?.docId}`), afterEdit);
    fetchBooks();
    setLoading(false);
    setModalEdit(false);
    setAfterEdit({
      docId: `${detail?.docId}`,
      Title: "",
      Author: "",
      Published: 0,
      Pages: 0,
    });
  };

  return (
    <ChakraProvider>
      <Table variant="simple" bg={"gray"}>
        <Thead>
          <Tr>
            <Th textColor={"black"} fontSize={20}>
              Title
            </Th>
            <Th textColor={"black"} fontSize={20}>
              Author
            </Th>
            <Th textColor={"black"} fontSize={20}>
              Published
            </Th>
            <Th textColor={"black"} fontSize={20}>
              Pages
            </Th>
            <Th textColor={"black"} fontSize={20}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {books?.map((books, index) => (
            <Tr key={index}>
              <Td>{books.Title}</Td>
              <Td>{books.Author}</Td>
              <Td>{books.Published}</Td>
              <Td>{books.Pages}</Td>
              <Td
                display={{
                  base: "table-cell",
                  md: "none",
                }}
                sx={{
                  "@media print": {
                    display: "none",
                  },
                  textTransform: "uppercase",
                  color: color2,
                  fontSize: "xs",
                  fontWeight: "bold",
                  letterSpacing: "wider",
                  fontFamily: "heading",
                }}
              >
                Actions
              </Td>
              <Td>
                <ButtonGroup variant="solid" size="sm" spacing={3}>
                  <IconButton colorScheme="blue" icon={<BsBoxArrowUpRight />} aria-label="Up" onClick={() => handleAdd(books)} />
                  <IconButton colorScheme="green" icon={<AiFillEdit />} aria-label="Edit" onClick={() => Edit(books)} />
                  <IconButton colorScheme="red" variant="outline" icon={<BsFillTrashFill />} aria-label="Delete" onClick={() => Delete(books.docId)} />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal onClose={() => setModal(false)} isOpen={modal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{detail?.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Author : {detail?.Author}</Text>
            <Text>Published : {detail?.Published}</Text>
            <Text>Pages : {detail?.Pages}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setModal(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit */}
      <Modal isOpen={modalEdit} onClose={() => setModalEdit(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Title" defaultValue={detail?.Title} onChange={(e) => setAfterEdit({ ...afterEdit, Title: e.target.value })} />
            </FormControl>

            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input placeholder="Author" defaultValue={detail?.Author} onChange={(e) => setAfterEdit({ ...afterEdit, Author: e.target.value })} />
            </FormControl>

            <FormControl>
              <FormLabel>Published</FormLabel>
              <Input type="number" placeholder="Published" defaultValue={detail?.Published} onChange={(e) => setAfterEdit({ ...afterEdit, Published: parseInt(e.target.value) })} />
            </FormControl>

            <FormControl>
              <FormLabel>Pages</FormLabel>
              <Input type= "number" placeholder="pages" defaultValue={detail?.Pages} onChange={(e) => setAfterEdit({ ...afterEdit, Pages: parseInt(e.target.value) })} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit} isLoading={loading}>
              Save
            </Button>
            <Button onClick={() => setModalEdit(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {JSON.stringify(books[0])}
    </ChakraProvider>
  );
}

export default BookList;
