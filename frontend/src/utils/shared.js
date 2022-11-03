import { toast } from "react-toastify";
import { localization } from "./localization";

export const errorHandler =
  (msg, callback = () => {}) =>
  (e) => {
    toast(
      `🤯 ${localization.ops}! ${msg || localization.looksLikeError + ":"} ${e.message ?? e}`
    );
    callback(e);
  };

export const handleError = async (action, msg) => {
  try {
    await action();
  } catch (err) {
    toast(
      `🤯 ${localization.ops} ${msg || localization.looksLikeError + ":"} ${
        (err.message || err.title) ?? err
      }`
    );
    if (err.details) {
      toast(err.details);
    }
  }
};
