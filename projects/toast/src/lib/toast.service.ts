import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  defaultDuration: number = 3500;
  toasts: {
    title: string,
    message: string;
    duration: number;
    type: 'success' | 'error' | 'welcome' | 'custom';
    icon?: string;
    iconColor?: string;
    bgColor?: string;
    isExiting?: boolean;
  }[] = [];

  add({
    title,
    message,
    duration = this.defaultDuration,
    type = 'success',
    icon,
    iconColor,
    bgColor
  }: {
    title: string,
    message: string;
    duration?: number;
    type?: 'success' | 'error' | 'welcome' | 'custom';
    icon?: string;
    iconColor?: string;
    bgColor?: string;
  }) {
    const toast = { title, message, duration, type, icon, iconColor, bgColor };

    this.toasts.push(toast);

    setTimeout(
      () => this.removeWithAnimation(this.toasts.length - 1),
      duration
    );
  }

  private removeWithAnimation(index: number) {
    this.toasts[index].isExiting = true;

    setTimeout(() => this.remove(index), 500);
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
