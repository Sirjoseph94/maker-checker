"use strict";

const TYPES = {
  A: "A",
  B: "B",
  C: "C",
};


class User {
  constructor(name, types) {
    this.name = name;
    this.types = types;
  }
  // store in DB
}

class Request {
  constructor(requestType, requester) {
    this.requestType = requestType;
    this.requester = requester;
    this.expirationTime = new Date(Date.now() + 1000 * (60 * 5)); // expire in 5 mins
  }
  // store on db
  static isExpired(date) {
    return new Date() > date;
  }
}

class Approver {
  constructor(request, approver) {
    this.request = request;
    this.user = approver;
  }

  canApprove() {
    if (Request.isExpired(this.request.expirationTime)) {
      console.log('Exceeded expiration time')
      return false;
    }

    if (this.request.requestType === TYPES.A) {
      console.log(this.request.requestType)
      console.log('Unauthorized')
      return false;
    }

    if (this.request.requestType === TYPES.B) {
      return this.user.types.includes(TYPES.A);
    }

    if (this.request.requestType === TYPES.C) {
      return this.user.types.includes(TYPES.A) || this.user.types.includes(TYPES.B);
    }

    return false;
  }

  approve() {
    if (!this.canApprove()) {
      return false;
    }
    // update db
    return true;
  }

  deny() {
    console.log(this.request.expirationTime)
    if (Request.isExpired(this.request.expirationTime)) {
      return false;
    }
    // update db
    return true;
  }
}


export {
  User,
  Request,
  Approver
}