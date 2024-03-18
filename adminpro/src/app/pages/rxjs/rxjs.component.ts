import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent {
  constructor() {
    
    const obs$ = new Observable((observer) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i igual a 2');
        }
      }, 1000);
    });

    obs$.pipe(
      retry(2)
    ).subscribe(
      (valor) => console.log('Subs: ', valor),
      (error) => console.warn(error),
      () => console.info('Observer finalizado')
    );
  }
}
