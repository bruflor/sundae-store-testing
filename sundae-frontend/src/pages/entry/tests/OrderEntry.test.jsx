import {logRoles, render, screen} from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { http, HttpResponse } from "msw";
import {server} from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", async () => {
            return new HttpResponse(null, {status: 500})
        }),
        http.get("http://localhost:3030/toppings", async () => {
            return new HttpResponse(null, {status: 500})
        })
    )

    const {container} = render(<OrderEntry />);
    const alerts = await screen.findAllByRole("alert");
    logRoles(container);
    expect(alerts).toHaveLength(2);
})