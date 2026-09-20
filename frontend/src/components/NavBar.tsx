import { Button, HStack, Heading } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../types/type";

interface NavBarProps {
  onNavigate: Dispatch<SetStateAction<Page>>;
}

function NavBar({ onNavigate }: NavBarProps) {
  return (
    <HStack justify="space-between" wrap="wrap" gap="6" px="6" py="4">
      <Heading size="lg" letterSpacing="tight" fontWeight="bold">
        Autotix
      </Heading>

      <HStack gap="6">
        <Button variant="ghost" onClick={() => onNavigate("home")}>Home</Button>
        <Button variant="ghost" onClick={() => onNavigate("myTix")}>MyTix</Button>
        <Button variant="ghost" onClick={() => onNavigate("howItWorks")}>How It Works</Button>
      </HStack>
    </HStack>
  );
}


export default NavBar;