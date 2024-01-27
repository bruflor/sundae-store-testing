# Notes to course

## Commands
- get: Expect element to be in DOM (render by default)
- query: expect elemento **not** to be in DOM
- find: expect element to appear async

## Tech

To mock http response the course uses **msw**.

## Methods and tips

- logRoles from testing-library/react to match and investigate the components that are being used. Alerts for example doesnt have the roles and accessible name at the same time to be matched together. 
- All userEvents need to be async, so add the await in front and make the test async
- use {exact:false} in the end of a byText to not have the exact text in the return.
