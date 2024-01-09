import Login from "../pages/Login";
import { render, screen } from '@testing-library/react';

describe('Login Component', () => {
    it('renders without crashing', () => {
        render(<Login />);
    })

    it('displays the correct form fields', () => {
        render(<Login />);
        expect(screen.getByLabelText('Login')).toBeInTheDocument();
    })
})