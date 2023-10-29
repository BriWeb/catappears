import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = ''): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = ''): void {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string = ''): void {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title: string = ''): void {
    this.toastr.info(message, title);
  }

}
