# Notes to course

## Commands
- getBy: Expect element **to be** in DOM (render by default)
- queryBy: expect element **not** to be in DOM
- findBy: expect element to appear async, so in front of it you always need to add **await**

## Tech

To mock http response the course uses **msw**.

## Tips

- logRoles from testing-library/react to match and investigate the components that are being used. Alerts for example doesnt have the roles and accessible name at the same time to be matched together;
- screen.debug() to render in the console what you have on screen;
- All userEvents need to be async, so add the await in front and make the test async
- use {exact:false} in the end of a byText to not have the exact text in the return.
- add a **delay()** method with miliseconds that need to delay the response from msw, so you could test your loading methods and so on.

## Standard questions to ask

- What to render?
    -What's the smallest component that encompasses tests?
- Do we need to pass any props?
- Do we need to wrap?
    - does the provider get used?
- where should the tests go?
    - which file? New file needed?
- what to test? What is the behaviour that need to be testing?
- How to test? What queries and events?
- Do we need to await? Is there anything async going on?


