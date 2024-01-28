import {screen, render} from "../../../test-utils/testing-library-utils"
import {server} from "../../../mocks/server"
import { HttpResponse, http } from "msw"
import OrderConfirmation from "../OrderConfirmation"

test("error response from server for submitting order", async () => {
    server.resetHandlers(
        http.post("http://localhost:3030/order", async() =>{
            return new HttpResponse.json(null, {status:500})
        })
    )

    const {container} = render(<OrderConfirmation />)
    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent("An unexpected error occurred. Please try again later.")
})