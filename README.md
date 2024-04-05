
#  Maker Checker Library

This library provides a simple implementation of an maker checker management system, allowing users to create requests and approvers to approve or deny those requests based on certain rules.

## Features

- User management: The `User` class represents a user in the system, with a name and a list of types (e.g., `A`, `B`, `C`).
- Request management: The `Request` class represents a request, with a request type and the requester. Requests have an expiration time of 5 minutes.
- Approval management: The `Approver` class represents an approver, who can approve or deny a request based on the request type and the approver's user types.

## Usage
### Types

```
  TYPES = {A, B, C}
```
### Creating a User

```javascript
const user1 = new User('John Doe', [TYPES.A, TYPES.B]);
const user2 = new User('Jane Smith', [TYPES.A, TYPES.C]);
```



### Creating a Request

```javascript
const request1 = new Request(TYPES.B, user1);
const request2 = new Request(TYPES.C, user2);
```

### Approving or Denying a Request

```javascript
const approver1 = new Approver(request1, user2);
const approver2 = new Approver(request2, user1);

console.log(approver1.canApprove()); // false
console.log(approver2.canApprove()); // true

console.log(approver2.approve()); // true
console.log(approver1.deny()); // true
```

### Run the Usage Example.

On your terminal, run

```
npm run start
```
Output will be displayed on the terminal.

## Classes

### `User`

- `constructor(name, types)`: Creates a new `User` instance with the given name and types.

### `Request`

- `constructor(requestType, requester)`: Creates a new `Request` instance with the given request type and requester.
- `isExpired(date)`: Checks if the given date has passed the request's expiration time.

### `Approver`

- `constructor(request, approver)`: Creates a new `Approver` instance with the given request and approver.
- `canApprove()`: Checks if the approver can approve the request based on the request type and the approver's user types.
- `approve()`: Approves the request if the approver can approve it.
- `deny()`: Denies the request if it has not expired.




## Error Handling

The library does not include explicit error handling, but it logs relevant information to the console when certain conditions are not met (e.g., unauthorized request type, expired request).

## Future Improvements
Due to the time constraints, the following was left unattended.

- Add more robust error handling and exception throwing.
- Implement a database layer to store and retrieve user, request, and approval data.
- Comprehensive Unit testing
- Retrival of request history from the database