import { Box, Button, Text, Heading } from "@chakra-ui/react";

interface ReservationDeletePageProps {
  onReturn: () => void;
}

function ReservationDeletePage({ onReturn }: ReservationDeletePageProps) {
  return (
    <Box p="8" textAlign="center">
      <Heading mb="4">Your ticket has been withdrawn</Heading>
      <Text mb="6">You can reserve tickets for this event again if they're still available.</Text>
      <Button onClick={onReturn}>Return to Home</Button>
    </Box>
  );
}

export default ReservationDeletePage;