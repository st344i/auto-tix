import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"


function ConfirmDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Read before you reserve</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Note that reserving isn't buying. You're pre-authorising this ticket at today's price. 
                When the official on-sale opens, your saved payment details will be automatically 
                charged and your ticket secured. No action is needed from you on sale day.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>yes, I understand</Button>
              <Button>Cancel</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ConfirmDialog; 