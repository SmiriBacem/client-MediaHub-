import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupForm from '.';

describe('SignupForm', () => {
  test('renders form inputs', () => {
    render(<SignupForm />);
  
    const nameInput = screen.getByLabelText(/Nom & Prénom/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
  
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
