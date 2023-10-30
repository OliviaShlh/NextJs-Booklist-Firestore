import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import StartPage from "@/app/components/StartPage";
import BookList from "./List/BookList";

export default function MyApp() {
  return (
    <ChakraProvider>
      <StartPage />
      <BookList />
    </ChakraProvider>
  );
}
