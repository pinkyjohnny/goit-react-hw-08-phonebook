import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Labelfirst,
  Labelsecond,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';

import { selectContacts } from 'redux/contacts/selector';
import { nanoid } from 'nanoid';
import { addContactThunk } from 'redux/contacts/operations';
import { Title } from 'components/App.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const { name, number } = formData;
  const contacts = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const existingContact = contacts.some(
      newName => newName.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`Contact with name ${name} is already exist`);
      return;
    }

    dispatch(addContactThunk({ name, number, id: nanoid() }));
    setFormData(INITIAL_STATE);
  };

  const handleInputChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <Title>Phonebook</Title>
      <Form onSubmit={handleSubmit}>
        <Labelfirst>
          Name:
          <Input
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            required
          />
        </Labelfirst>
        <Labelsecond>
          Number:
          <Input
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            required
          />
        </Labelsecond>
        <Button>Add contact</Button>
      </Form>
    </div>
  );
};
