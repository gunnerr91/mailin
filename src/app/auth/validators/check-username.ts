import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckUsername implements AsyncValidator {
  constructor(private client: HttpClient) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let result = this.client
      .post<any>('https://api.angular-email.com/auth/username', {
        username: control.value,
      })
      .pipe(
        map((value) => {
          if (value.available) {
            return null;
          }
          return value;
        }),
        catchError((err) => {
          if (err.error.username) {
            return of({ usernameExists: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
    return result;
  };
}
