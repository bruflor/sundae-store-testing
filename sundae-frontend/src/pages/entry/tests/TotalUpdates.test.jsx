import { findByRole, render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry"

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.00");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot Fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("2.00");

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.00");
});

describe("Grand total", ()=>{
    test("grand total starts at zero", ()=>{
      render(<OrderEntry />)

      const grandTotal = screen.getByRole("heading", {name:/Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent("0.00")
      
    })

    test("grand total updates properly if scoops is added first", async() => {
      const user = userEvent.setup();
      render(<OrderEntry />)

      const grandTotal = screen.getByRole("heading", {name:/Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent("0.00")

      const scoopVanilla = await screen.findByRole("spinbutton", {name:/Vanilla/i})
      await user.clear(scoopVanilla)
      await user.type(scoopVanilla, "2")
      expect(grandTotal).toHaveTextContent("4.00")

      const toppingCherry = await screen.findByRole("checkbox", {name:/Cherries/i})
      await user.click(toppingCherry)

      expect(grandTotal).toHaveTextContent("5.00")
    })

    test("grand total updates properly if toopings is added first", async() => {
      const user = userEvent.setup();
      render(<OrderEntry />)

      const grandTotal = screen.getByRole("heading", {name:/Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent("0.00")

      const toppings = await screen.findByRole("checkbox", {name:/Cherries/i})
      await user.click(toppings)
      expect(grandTotal).toHaveTextContent("1.00")

      const chocolateScoop = await screen.findByRole("spinbutton", {name:/Chocolate/i})
      await user.clear(chocolateScoop)
      await user.type(chocolateScoop, "2")

      expect(grandTotal).toHaveTextContent("5.00")
    })
    test("grand total updates properly if item is removed", async() => {
      const user = userEvent.setup()
      render(<OrderEntry />)

      const grandTotal = screen.getByRole("heading", {name:/Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent("0.00")
      
      const chocolateScoop = await screen.findByRole("spinbutton", {name:/Chocolate/i})
      await user.clear(chocolateScoop)
      await user.type(chocolateScoop, "1")
      expect(grandTotal).toHaveTextContent("2.00")

      await user.type(chocolateScoop, "0")
      expect(grandTotal).toHaveTextContent("0.00")
    })
})