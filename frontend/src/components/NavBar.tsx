import { Button, HStack } from "@chakra-ui/react"

function NavBar() { //function declaration
  return (
    <HStack wrap="wrap" gap="6">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">My Tix</Button>
      <Button variant="ghost">How It Works</Button>
    </HStack>
  )
}

export default NavBar;