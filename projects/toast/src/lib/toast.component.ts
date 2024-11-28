import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        })
      ),
      transition('void => in', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.3s ease-out'),
      ]),
      transition('in => out', [
        animate(
          '0.3s ease-out',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
  template: `
    <div class="toast fixed top-16 right-8 z-[999999]">
      <div
        *ngFor="let toast of toastService.toasts; let i = index"
        [@slideInOut]="toast.isExiting ? 'out' : 'in'"
        class="card max-w-96 h-20 flex items-center justify-between gap-3 bg-white rounded-lg py-3 px-3 mb-5 cursor-default"
      >
        <div
          class="min-w-10 h-10 flex items-center justify-center rounded-full shadow-md"
          [ngClass]="{
            'bg-green-500': toast.type === 'success',
            'bg-red-200': toast.type === 'error',
            'bg-purple-300': toast.type === 'welcome'
          }"
        >
          <iconify-icon
            [icon]="getIconForToast(toast)"
            width="24"
            height="24"
            [className]="getIconColorForToast(toast)"
          />
        </div>
        <div class="w-full flex flex-col">
          <span
            class="text-lg font-bold"
            [ngClass]="{
              'text-green-500': toast.type === 'success',
              'text-red-500': toast.type === 'error',
              'text-black': toast.type === 'welcome'
            }"
          >
            {{
              toast.type === 'success'
                ? 'Sucesso'
                : toast.type === 'error'
                ? 'Erro'
                : toast.type === 'welcome'
                ? 'Bem-vindo'
                : toast.title
            }}
          </span>
          <p class="text-sm text-gray-600">{{ toast.message }}</p>
        </div>
        <iconify-icon
          icon="material-symbols:close"
          width="24"
          height="24"
          (click)="removeToast(i)"
          class="cursor-pointer"
        />
      </div>
    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./toast.css'],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  removeToast(index: number) {
    this.toastService.toasts[index].isExiting = true;

    setTimeout(() => {
      this.toastService.remove(index);
    }, 300);
  }

  getIconForToast(toast: any): string {
    if (toast.type === 'success') {
      return 'material-symbols:check-circle';
    } else if (toast.type === 'error') {
      return 'material-symbols:cancel';
    } else if (toast.type === 'welcome') {
      return 'tabler:diamond';
    } else if (toast.type === 'custom' && toast.icon) {
      return toast.icon;
    }

    return '';
  }

  getIconColorForToast(toast: any): string {
    if (toast.type === 'success') {
      return 'text-white';
    } else if (toast.type === 'error') {
      return 'text-red-500';
    } else if (toast.type === 'welcome') {
      return 'text-black';
    } else if (toast.type === 'custom' && toast.iconColor) {
      return toast.iconColor;
    }

    return '';
  }
}
