import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  interval,
  retry,
  take,
  map,
  filter,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnDestroy{
  public intervalSubscription: Subscription;
  constructor() {
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   (valor) => console.log('Subs: ', valor),
    //   (error) => console.warn(error),
    //   () => console.info('Observer finalizado')
    // );

    this.intervalSubscription = this.retornaIntervalo().subscribe((valor) =>
      console.log(valor)
    );
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe(); //destruye el observable al cerrar el componente
  }

  retornaIntervalo() {
    const interval$ = interval(1000).pipe(
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );

    return interval$;
  }

  retornaObservable(): Observable<number> {
    const obs$ = new Observable<number>((observer) => {
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

    return obs$;
  }
}
