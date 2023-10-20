import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      if ( email === 'samuel@google.com' ) {
        subscriber.next({ emailTaken: true})
        subscriber.complete();
        // return;
      }

      subscriber.next(null);
      subscriber.complete();

    });

    return httpCallObservable;
}



/*  validate(control: AbstractControl): Observable<ValidationErrors | null> {
      const email = control.value;

      return of({
        emailTaken: true
      }).pipe(
        delay(2000)
      );
  } */
}
