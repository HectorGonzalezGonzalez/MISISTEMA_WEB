function toast_success(msj) {
    toastr.success(msj, 'Exito', {
        'progressBar': true,
        "closeButton": true,
        "timeOut": "2000",
        "positionClass": "toast-bottom-right",
    })
}

function alertSw(icon, title, text) {
    //Swal.fire('Any fool can use a computer');
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: 'Aceptar'
    })
}