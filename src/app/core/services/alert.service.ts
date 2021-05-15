import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  Toast: any;
  constructor() {
    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

  operationResult(operation, Text, status: 'success' | 'error') {
    Swal.fire(
      operation,
      Text,
      status
    )
  }

  simpleAlert(text:string, title='Alert'){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    })
  }

  confirmPopup(text: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
  }

  inputAlert(title, confirmButtonText) {
    return Swal.fire({
      title: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      showLoaderOnConfirm: true
    })
  }


  /**
   * Normal toast show
   * @message : Message you what to show on toast
   */
  success(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message
    })
  }

  /**
  * Normal toast show
  * @message : Message you what to show on toast
  */
  error(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message
    })
  }

}
