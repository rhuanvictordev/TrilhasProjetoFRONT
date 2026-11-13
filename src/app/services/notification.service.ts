
import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    message: string;
    type: NotificationType;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notification = signal<Notification | null>(null);

    private timeout: ReturnType<typeof setTimeout> | null = null;

    show(message: string, type: NotificationType = 'info'): void {

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.notification.set({ message, type });

        this.timeout = setTimeout(() => {
            this.hide();
        }, 4000);
    }

    success(message: string): void {
        this.show(message, 'success');
    }

    error(message: string): void {
        this.show(message, 'error');
    }

    warning(message: string): void {
        this.show(message, 'warning');
    }

    info(message: string): void {
        this.show(message, 'info');
    }

    hide(): void {
        this.notification.set(null);

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}
