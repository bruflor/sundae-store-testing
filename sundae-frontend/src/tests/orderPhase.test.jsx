import {logRoles, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import App from "../App"

test("order phases for happy path", async() => {
    const user = userEvent.setup()
    //render app
    const {container} = render(<App />)

    //add ice cream, scoops and toppings
    const vanillaScoop = await screen.findByRole("spinbutton", {name:/Vanilla/i})
    await user.clear(vanillaScoop)
    await user.type(vanillaScoop, "1")
    
    const chocolateScoop = await screen.findByRole("spinbutton", {name:/Chocolate/i})
    await user.clear(chocolateScoop)
    await user.type(chocolateScoop, "2")

    const cherriesToppings = await screen.findByRole("checkbox", {name:/Cherries/i})
    await user.click(cherriesToppings)

    // find and click order button
    const orderButton = await screen.findByRole("button", {name:/Order Sundae!/i})
    await user.click(orderButton)

    //check summary information based on order
    const listScoopsChocolate = await screen.findByText(/2 Chocolate/i)
    expect(listScoopsChocolate).toBeInTheDocument()

    const listScoopsVanilla = await screen.findByText(/1 Vanilla/i)
    expect(listScoopsVanilla).toBeInTheDocument()
    
    const scoopsTotal = await screen.findByRole("heading", {name:/Scoops: \$/i})
    expect(scoopsTotal).toHaveTextContent("6.00")

    const listOfToppingsCherries = await screen.findByText(/Cherries/i)
    expect(listOfToppingsCherries).toBeInTheDocument()

    const toppingsTotal = await screen.findByRole("heading", {name: /Toppings: \$/i})
    expect(toppingsTotal).toHaveTextContent("1.00")
    
    //accept terms and conditions and click button to confirm order
    const checkboxTerms = await screen.findByRole('checkbox', {name: /terms and conditions/i})
    expect(checkboxTerms).not.toBeChecked()
    await user.click(checkboxTerms)
    expect(checkboxTerms).toBeChecked()

    const buttonConfirm = await screen.findByRole('button', {name: /Confirm order/i})
    await user.click(buttonConfirm)

    // confirm order number on confirmation page
    const orderNumber = await screen.findByText("Your order number is", {exact:false})
    expect(orderNumber).toHaveTextContent("10000000008")
    
    //click new order  button on confirmation page
    const newOrderButton = await screen.findByRole('button', {name:/Create new order/i})
    await user.click(newOrderButton)
    
    //check that scoops and topping subtotals have been reset
    const scoopSubtotal = await screen.findByText("Scoops total: ", {exact:false})
    expect(scoopSubtotal).toHaveTextContent("0.00")
    const toppingsSubtotal = await screen.findByText("Toppings total: ", {exact:false})
    expect(toppingsSubtotal).toHaveTextContent("0.00")
})