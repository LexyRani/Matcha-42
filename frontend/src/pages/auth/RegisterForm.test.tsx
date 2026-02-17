import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Register } from './Register';

describe('RegisterForm Integration', () => {
  
  // TEST 1 : EMAIL INVALIDE
  it('affiche une erreur pour un email invalide', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Register /></MemoryRouter>);

    // 1. Remplir TOUS les champs obligatoires (sauf email qui sera faux)
    await user.type(screen.getByLabelText(/first name/i), 'Bill');
    await user.type(screen.getByLabelText(/last name/i), 'Gates');
    await user.type(screen.getByLabelText(/username/i), 'billgates'); // IMPORTANT !
    
    // 2. Mettre un email CLAIREMENT invalide (pas d'arobase)
    await user.type(screen.getByLabelText(/email/i), 'bad-email-sans-arobase');

    // 3. Mettre des mots de passe valides
    await user.type(screen.getByLabelText(/^password$/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');

    // 4. Soumettre
    await user.click(screen.getByRole('button', { name: /create account/i }));

    // 5. Vérifier l'erreur
    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument(); 
    });
  });

  // TEST 2 : FORMULAIRE VALIDE
  it('accepte un formulaire valide sans erreur', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Register /></MemoryRouter>);

    // 1. Remplir TOUT correctement
    await user.type(screen.getByLabelText(/first name/i), 'Bill');
    await user.type(screen.getByLabelText(/last name/i), 'Gates');
    await user.type(screen.getByLabelText(/username/i), 'billgates');
    
    // 2. Mettre un VRAI email
    await user.type(screen.getByLabelText(/email/i), 'bill@gates.com');

    // 3. Mots de passe
    await user.type(screen.getByLabelText(/^password$/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');

    // 4. Soumettre
    await user.click(screen.getByRole('button', { name: /create account/i }));

    // 5. Vérifier qu'il n'y a PAS d'erreur
    await waitFor(() => {
        expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
        //message de succès (alert ou autre), tu peux le vérifier ici
    });
  });

});


