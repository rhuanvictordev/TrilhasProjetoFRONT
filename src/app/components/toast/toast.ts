import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    templateUrl: './toast.html',
    styleUrl: './toast.css'
})
export class Toast {

    notificationService = inject(NotificationService);

}
