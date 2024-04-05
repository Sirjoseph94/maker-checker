import { User, Request, Approver, TYPES } from "./maker-checker.js";

const user1 = new User('John', [TYPES.A]);
const user2 = new User('Jane', [TYPES.A, TYPES.B]);

const request1 = new Request(TYPES.B, user1);
const approver = new Approver(request1, user2);

if (approver.canApprove()) {
  const success = approver.approve();
  console.log(success ? 'Request approved!' : 'Failed to approve request');
} else {
  console.log('User cannot approve this request');
}

const denied = approver.deny()
console.log(denied ? 'Request denied!' : 'Exceeded time limit');
