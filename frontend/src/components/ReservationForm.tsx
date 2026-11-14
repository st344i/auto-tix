import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
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
import type { Reservation, TicketedEvent } from "../types/type";

interface ReservationFormProps {
  ticketedEvent: TicketedEvent;
  onCancel: () => void;
  onReserve: (reservation: Reservation, ticketedEvent: TicketedEvent) => void;
}

interface FormErrors {
  buyerFirstName?: string;
  buyerLastName?: string;
  buyerEmail?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  termsAccepted?: string;
  submit?: string;
}

function formatCardNumber(cardNumber: string): string {
  return cardNumber
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function isCardExpired(expiry: string): boolean {
  const parts = expiry.split("/");
  if (parts.length !== 2) {
    return true;
  }

  const expiryMonth = Number(parts[0]);
  const expiryYear = Number(parts[1]) + 2000;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (expiryYear < currentYear) {
    return true;
  }
  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return true;
  }
  return false;
}

function ReservationForm({ ticketedEvent, onCancel, onReserve }: ReservationFormProps) {
  const payment = usePaymentInputs();
  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (buyerFirstName.trim() === "") {
      newErrors.buyerFirstName = "First name is required.";
    }

    if (buyerLastName.trim() === "") {
      newErrors.buyerLastName = "Last name is required.";
    }

    if (buyerEmail.trim() === "") {
      newErrors.buyerEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) {
      newErrors.buyerEmail = "Enter a valid email address.";
    }

    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly === "") {
      newErrors.cardNumber = "Card number is required.";
    } else if (digitsOnly.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (cardExpiry.trim() === "") {
      newErrors.cardExpiry = "Expiry date is required.";
    } else if (isCardExpired(cardExpiry)) {
      newErrors.cardExpiry = "This card has expired.";
    }

    if (cardCvc.trim() === "") {
      newErrors.cardCvc = "CVC is required.";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserve = async () => {
    if (!validate()) {
      return;
    }

    const reservationPayload = {
      event: ticketedEvent,
      buyerFirstName: buyerFirstName.trim(),
      buyerLastName: buyerLastName.trim(),
      buyerEmail,
      ticketType: "General",
      cardNumber,
      cardCvc,
      cardExpiry,
      status: "PENDING",
    };

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationPayload),
      });

      if (!res.ok) {
        throw new Error(`Reservation failed: ${res.status}`);
      }

      const savedReservation: Reservation = await res.json();
      onReserve(savedReservation, ticketedEvent);
    } catch (err) {
      console.error("Failed to create reservation:", err);
      setErrors((prev) => ({
        ...prev,
        submit: "Something went wrong submitting your reservation. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setBuyerFirstName("");
    setBuyerLastName("");
    setBuyerEmail("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setTermsAccepted(false);
    setErrors({});
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
          <Field.Label>First name</Field.Label>
          <Input
            name="buyerFirstName"
            value={buyerFirstName}
            onChange={(e) => setBuyerFirstName(e.target.value)}
          />
          {errors.buyerFirstName && <Box color="red.500">{errors.buyerFirstName}</Box>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Last name</Field.Label>
          <Input
            name="buyerLastName"
            value={buyerLastName}
            onChange={(e) => setBuyerLastName(e.target.value)}
          />
          {errors.buyerLastName && <Box color="red.500">{errors.buyerLastName}</Box>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input
            name="buyerEmail"
            type="email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
          />
          {errors.buyerEmail && <Box color="red.500">{errors.buyerEmail}</Box>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Payment Details</Field.Label>
          <Box spaceY="-1px">
            <InputGroup
              zIndex={{ _focusWithin: "1" }}
              endElement={<CardImage {...payment} />}
            >
              <Input
                roundedBottom="0"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
            </InputGroup>
            {errors.cardNumber && <Box color="red.500">{errors.cardNumber}</Box>}

            <Group w="full" attached>
              <Input
                roundedTopLeft="0"
                {...payment.getExpiryDateProps({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCardExpiry(e.target.value),
                })}
              />
              <Input
                roundedTopRight="0"
                {...payment.getCVCProps({
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCardCvc(e.target.value),
                })}
              />
            </Group>
            {errors.cardExpiry && <Box color="red.500">{errors.cardExpiry}</Box>}
            {errors.cardCvc && <Box color="red.500">{errors.cardCvc}</Box>}
          </Box>
        </Field.Root>

        <Field.Root>
          <Checkbox.Root
            checked={termsAccepted}
            onCheckedChange={(e) => setTermsAccepted(!!e.checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              I understand this is a pre-authorisation, not a purchase, and my payment details will
              be charged automatically at on-sale.
            </Checkbox.Label>
          </Checkbox.Root>
          {errors.termsAccepted && <Box color="red.500">{errors.termsAccepted}</Box>}
        </Field.Root>

        {errors.submit && <Box color="red.500">{errors.submit}</Box>}
      </Fieldset.Content>

      <ButtonGroup size="sm" variant="outline">
        <Button onClick={handleReserve} colorPalette="gray" disabled={isSubmitting}>
          {isSubmitting ? "Reserving..." : "Reserve"}
        </Button>
        <Button onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </ButtonGroup>
    </Fieldset.Root>
  );
}


const CardImage = (props: ReturnType<typeof usePaymentInputs>) => {
  const { meta, getCardImageProps } = props;
  return (
    <Show when={meta.cardType} fallback={<LuCreditCard size={16} aria-hidden="true" />}>
      <svg {...getCardImageProps({ images: cardImages })} />
    </Show>
  );
};

export default ReservationForm;