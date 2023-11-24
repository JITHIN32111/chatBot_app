
import {  toast } from "react-toastify";
const useCopyTo = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
               toast.success("Text copied to clipboard", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  return { copyToClipboard };
};

export default useCopyTo;
