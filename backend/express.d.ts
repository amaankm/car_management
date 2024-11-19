// types/express.d.ts

import { User } from "./models/user"; // Import the user type from your user model or define it here

declare global {
  namespace Express {
    interface Request {
      user?: User; // `user` will be of type `User` or `undefined`
    }
  }
}
