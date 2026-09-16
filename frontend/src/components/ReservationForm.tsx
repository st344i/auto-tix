import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Field,
  Fieldset,
  Stack,
  Box,
  Group,
  Input,
  InputGroup,
  Show,
} from "@chakra-ui/react";
import { LuCreditCard } from "react-icons/lu";
import { usePaymentInputs } from "react-payment-inputs";
import cardImages from "react-payment-inputs/images";
import type { Reservation } from "../types/type";
import type { TicketedEvent } from "../types/type";

interface ReservationFormProps {
  ticketedEvent: TicketedEvent;                                                 
  onCancel: () => void;
  onReserve: (reservation: Reservation, ticketedEvent: TicketedEvent) => void;  
  /**Describes what this component needs to be handed from outside: 
   which ticketedEvent is being reserved,a function to call when cancelled, and a function 
   to call when reserved —  that last one now hands back the actual reservation 
   and ticketedEvent data, so the parent (App.tsx) can use it. */
} 
function ReservationForm({ ticketedEvent, onCancel, onReserve }: ReservationFormProps) {
  const payment = usePaymentInputs();
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  
/**Pulls ticketedEvent, onCancel, onReserve out of props. 
 Sets up the payment library's helper object. Creates two storage boxes (name, email), 
 both starting empty, to hold what the buyer types. */
const handleReserve = () => {
  const newReservation: Reservation = {
    id: 0,
    eventId: ticketedEvent.id,
    buyerName,
    buyerEmail,
    ticketType: "General",
    cardNumber: payment.getCardNumberProps().value ?? "",
    cardCvc: payment.getCVCProps().value ?? "",
    cardExpiry: payment.getExpiryDateProps().value ?? "",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  onReserve(newReservation, ticketedEvent);
};

  const handleCancel = () => {
    setBuyerName("");
    setBuyerEmail("");
    onCancel();
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Reservation Details</Fieldset.Legend>
        <Fieldset.HelperText>
          In order to pre-authorise tickets for {ticketedEvent.eventName}, please provide payment details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            name="buyerName"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input
            name="buyerEmail"
            type="email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Payment Details</Field.Label>
          <Box spaceY="-1px">
            <InputGroup
              zIndex={{ _focusWithin: "1" }}
              endElement={<CardImage {...payment} />}
            >
              <Input roundedBottom="0" {...payment.getCardNumberProps()} />
            </InputGroup>
            <Group w="full" attached>
              <Input roundedTopLeft="0" {...payment.getExpiryDateProps()} />
              <Input roundedTopRight="0" {...payment.getCVCProps()} />
            </Group>
          </Box>
        </Field.Root>
      </Fieldset.Content>

      <ButtonGroup size="sm" variant="outline">
        <Button onClick={handleReserve} colorPalette="gray">
          Reserve
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </Fieldset.Root>
  );
}


const images = cardImages;

const CardImage = (props: ReturnType<typeof usePaymentInputs>) => {
  const { meta, getCardImageProps } = props;
  return (
    <Show
      when={meta.cardType}
      fallback={<LuCreditCard size={16} aria-hidden="true" />}
    >
      <svg {...getCardImageProps({ images })} />
    </Show>
  );
};

export default ReservationForm;