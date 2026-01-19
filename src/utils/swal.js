import Swal from "sweetalert2";

export const confirmAction = (title, text) =>
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
  });
