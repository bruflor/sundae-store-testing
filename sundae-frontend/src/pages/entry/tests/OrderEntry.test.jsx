import {render, screen} from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from "msw";
import {server} from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
        res.get("http://localhost:3030/scoops", async () => {
            return new HttpResponse(null, {status: 500})
        }),
        res.get("http://localhost:3030/toppings", async () => {
            return new HttpResponse(null, {status: 500})
        })
    )

    render(<OrderEntry />);
    const alerts = await screen.findAllByRole("alert", {name: "An unexpected error occurred. Please try again later."});
    expect(alerts).toHaveLength(2);
})