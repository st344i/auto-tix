import { Box, Button, Card, Heading, Text } from "@chakra-ui/react";

interface HowItWorksProps {
  onReturn: () => void;
}

function HowItWorks({ onReturn }: HowItWorksProps) {
  return (
    <Card.Root maxW="xl" p="6" mx="auto" mt="8">
      <Card.Body gap="4">
        <Heading size="lg">How does AutoTix work?</Heading>

        <Box>
          <Text fontWeight="semibold">1. Browse events</Text>
          <Text>Take a look at upcoming events and pick one you're interested in.</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">2. Pre-authorise your ticket</Text>
          <Text>
            Submit your details and payment information ahead of time. This isn't a purchase yet —
            it's a pre-authorisation, holding your spot at today's price.
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">3. We handle the rest</Text>
          <Text>
            When the official on-sale opens, your saved payment details are automatically charged
            and your ticket is secured — no action needed from you on sale day.
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">4. Manage your reservation</Text>
          <Text>
            Head to "My Tix" any time to view, update, or withdraw a pending pre-authorisation
            before the on-sale happens.
          </Text>
        </Box>
      </Card.Body>

      <Card.Footer>
        <Button onClick={onReturn}>Return to home</Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default HowItWorks;