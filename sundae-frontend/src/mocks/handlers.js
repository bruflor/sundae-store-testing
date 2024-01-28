import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", async () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
  http.get("http://localhost:3030/toppings", async () => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" }
    ])
  }),
  http.post("http://localhost:3030/order", async() =>{
    await delay(400)
    return HttpResponse.json({}, {status: 201})
  })
];