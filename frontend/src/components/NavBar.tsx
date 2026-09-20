import { Button, HStack } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../types/type";

interface NavBarProps {
  onNavigate: Dispatch<SetStateAction<Page>>;
}

function NavBar({ onNavigate }: NavBarProps) {
  return (
    <HStack wrap="wrap" gap="6">
      <Button variant="ghost" onClick={() => onNavigate("home")}>Home</Button>
      <Button variant="ghost" onClick={() => onNavigate("myTix")}>MyTix</Button>
      <Button variant="ghost" onClick={() => onNavigate("howItWorks")}>How It Works</Button>
    </HStack>
  );
}

export default NavBar;