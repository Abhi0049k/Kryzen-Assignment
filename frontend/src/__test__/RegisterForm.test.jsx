import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";

describe('Register Component', ()=>{
    it('renders without crashing', ()=>{
        render(<Register/>)
    })

    it('displays the correct form fields', ()=>{
        render(<Register/>);
        expect(screen.getByLabelText('Register')).toBeInTheDocument();
    })
})