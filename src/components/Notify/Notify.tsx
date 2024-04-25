import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NotificationType = "success" | "loading" | "error";

interface NotificationProps {
  type: NotificationType;
  message: string;
  options?: ToastOptions;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  options,
}) => {
  const notify = (
    type: NotificationType,
    message: string,
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "loading":
        toast.info(message, { autoClose: false, ...options });
        break;
      case "error":
        toast.error(message, options);
        break;
      default:
        toast(message, options);
    }
  };

  return <>{notify(type, message, options)}</>;
};

export default Notification;
