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
          class="min-w-10 h-10 flex items-center justify-center rounded-full"
          [ngClass]="{
            'bg-green-500': toast.type === 'success',
            'bg-red-200': toast.type === 'error',
            'bg-purple-300': toast.type === 'welcome'
          }"
        >
          <iconify-icon
            icon="{{
              toast.type === 'success'
                ? 'material-symbols:check-circle'
                : toast.type === 'error'
                ? 'material-symbols:cancel'
                : toast.type === 'welcome'
                ? 'tabler:diamond'
                : ''
            }}"
            width="24"
            height="24"
            [className]="
              toast.type === 'success'
                ? 'text-white'
                : toast.type === 'error'
                ? 'text-red-500'
                : toast.type === 'welcome'
                ? 'text-purple-creath-8'
                : ''
            "
          />
        </div>
        <div class="w-full flex flex-col">
          <span
            class="text-lg font-bold"
            [ngClass]="{
              'text-green-500': toast.type === 'success',
              'text-red-500': toast.type === 'error',
              'text-purple-creath-8': toast.type === 'welcome'
            }"
          >
            {{ toast.type === 'success' ? 'Sucesso' : toast.type === 'error' ? 'Erro' : 'Bem-vindo' }}
          </span>
          <p class="text-sm font-arboria text-gray-600">{{ toast.message }}</p>
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
}
