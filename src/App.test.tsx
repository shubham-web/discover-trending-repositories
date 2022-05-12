import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders hero section and navigation without crashing", () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);

	const heroSection = screen.getByTestId("hero-wrapper");
	const navigation = screen.getByTestId("navigation-wrapper");

	expect(heroSection).toBeInTheDocument();
	expect(navigation).toBeInTheDocument();
});
