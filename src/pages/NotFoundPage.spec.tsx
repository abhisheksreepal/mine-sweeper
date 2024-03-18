import { render } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import "@testing-library/jest-dom";

describe("Check Not Found component", () => {
  it("Check Not found text", () => {
    const { getByText } = render(<NotFoundPage></NotFoundPage>);

    expect(getByText("404 Not found page")).toBeInTheDocument();
  });
});
