import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { SetState } from "../../types";
import EditTransctionSettingsType from "../../types/EditTransctionSettings";

interface Props {
  settings: EditTransctionSettingsType;
  setSettings: SetState<EditTransctionSettingsType>;
  setSettingsOpen: SetState<boolean>;
}

function EditTransactionSettings({
  settings,
  setSettings,
  setSettingsOpen,
}: Props) {
  return (
    <>
      <ModalHeader>Edit transaction settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack align="left">
          <Checkbox
            isChecked={settings.customDate}
            onChange={() =>
              setSettings((prev) => ({ ...prev, customDate: !prev.customDate }))
            }
          >
            Custom date
          </Checkbox>
          <Divider />
          <Checkbox
            isChecked={settings.splitTransaction}
            onChange={() =>
              setSettings((prev) => ({
                ...prev,
                splitTransaction: !prev.splitTransaction,
              }))
            }
          >
            Split transaction
          </Checkbox>
          <Divider />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setSettingsOpen(false)}>Go back</Button>
      </ModalFooter>
    </>
  );
}

export default EditTransactionSettings;
