/**
 * Represents the different types of requests.
 * @readonly
 * @enum {string}
 */
const TYPES = {
  A: 'A',
  B: 'B',
  C: 'C'
};

/**
 * Represents a user in the system.
 */
class User {
  /**
   * Creates a new User instance.
   * @param {string} name - The name of the user.
   * @param {string[]} types - The types associated with the user.
   */
  constructor(name, types) {
    this.name = name;
    this.types = types;
  }
}

/**
 * Represents a request in the system.
 */
class Request {
  /**
   * Creates a new Request instance.
   * @param {string} requestType - The type of the request.
   * @param {User} requester - The user who made the request.
   */
  constructor(requestType, requester) {
    this.requestType = requestType;
    this.requester = requester;
    this.expirationTime = new Date(Date.now() + 1000 * (60 * 5)); // Expire in 5 minutes
  }

  /**
   * Checks if the given date has passed the request's expiration time.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date has passed the request's expiration time, false otherwise.
   */
  static isExpired(date) {
    return new Date() > date;
  }
}

/**
 * Represents an approver for a request.
 */
class Approver {
  /**
   * Creates a new Approver instance.
   * @param {Request} request - The request to be approved or denied.
   * @param {User} approver - The user who is the approver.
   */
  constructor(request, approver) {
    this.request = request;
    this.user = approver;
  }

  /**
   * Checks if the approver can approve the request.
   * @returns {boolean} - True if the approver can approve the request, false otherwise.
   */
  canApprove() {
    if (new Date() > this.request.expirationTime) {
      console.log('Exceed expiration time');
      return false;
    }

    if (this.request.requestType === TYPES.A) {
      console.log(this.request.requestType);
      console.log('Unauthorized');
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

  /**
   * Approves the request if the approver can approve it.
   * @returns {boolean} - True if the request was approved, false otherwise.
   */
  approve() {
    if (!this.canApprove()) {
      return false;
    }

    // Update the database
    return true;
  }

  /**
   * Denies the request if it has not expired.
   * @returns {boolean} - True if the request was denied, false otherwise.
   */
  deny() {
    if (Request.isExpired(this.request.expirationTime)) {
      return false;
    }

    // Update the database
    return true;
  }
}

export { User, Request, Approver, TYPES };