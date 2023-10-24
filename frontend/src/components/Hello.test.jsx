import React from "react";
import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

describe("test Hello Component", () => {
    it("should have the text \"Hello World!\"", () => {
        render(<Hello />);
        const myElement = screen.getByText(/Hello World!/);
        expect(myElement).toBeInTheDocument();
    })
})
