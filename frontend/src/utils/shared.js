import { toast } from "react-toastify";

export const errorHandler =
  (msg, callback = () => { }) =>
    (e) => {
      toast(
        `🤯 Oops! ${msg || "It looks like error occurred:"} ${e.message ?? e}`
      );
      callback(e);
    };
