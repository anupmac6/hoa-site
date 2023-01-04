import { firestore } from 'helpers/Firebase';
import React, { useState } from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';

const AddNewModal = ({ modalOpen, toggleModal, address, currentUser }) => {
  console.log(currentUser);
  const [notes, setNotes] = useState('');
  const [isCash, setIsCash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log(address);

  const onSaveHandler = async () => {
    try {
      setIsLoading(true);
      await firestore
        .collection('payments')
        .doc(new Date().getFullYear().toString())
        .collection('receipts')
        .doc(address.id)
        .set({
          method: isCash ? 'Cash' : 'Check',
          created: Math.floor(new Date().getTime() / 1000),
          userId: currentUser?.uid,
          notes,
          street: address.street,
        });

      setIsLoading(false);

      toggleModal();
    } catch (error) {
      toggleModal();
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      {isLoading && <div className="loading" />}
      {!isLoading && (
        <>
          <ModalHeader toggle={toggleModal}>Record Payment</ModalHeader>
          <ModalBody>
            <Label>Street</Label>
            <Input disabled defaultValue={address?.street} />

            <Label className="mt-4">Notes</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              type="textarea"
              name="text"
              id="exampleText"
            />
            <Label className="mt-4">Payment Method</Label>
            <CustomInput
              onChange={() => setIsCash(true)}
              type="radio"
              id="cash"
              name="customRadio"
              label="Cash"
              checked={isCash}
            />
            <CustomInput
              onChange={() => setIsCash(false)}
              type="radio"
              id="check"
              name="customRadio"
              label="Check"
              checked={!isCash}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={onSaveHandler}>
              Save
            </Button>{' '}
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default AddNewModal;
