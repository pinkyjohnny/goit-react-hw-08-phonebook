import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { authReducer } from './auth/slice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        auth: authReducer,
    },
});
