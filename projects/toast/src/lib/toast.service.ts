import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  defaultDuration: number = 3500;
  toasts: { message: string; duration: number; type: 'success' | 'error' | 'welcome', isExiting?: boolean; }[] =
    [];

  add(
    message: string,
    duration: number = this.defaultDuration,
    type: 'success' | 'error' | 'welcome' = 'success'
  ) {
    const toast = { message, duration, type };
    this.toasts.push(toast);

    setTimeout(() => this.removeWithAnimation(this.toasts.length - 1), duration);
  }

  private removeWithAnimation(index: number) {
    this.toasts[index].isExiting = true;

    setTimeout(() => this.remove(index), 500);
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
