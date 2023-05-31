import Swal from "sweetalert2";
import "./styles.css";

const handleMouseInOut: any = (toast : any) => {
  toast.addEventListener("mouseenter", Swal.stopTimer);
  toast.addEventListener("mouseleave", Swal.resumeTimer);
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: false,
  didOpen: handleMouseInOut,
});

// On vas avoir 3 type d'alerte succés, erreur, et lors des erreurs
const makeToast = (type: 'success' | 'error' | 'warning', msg: string): void => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default makeToast;
