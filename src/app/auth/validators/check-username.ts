import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class CheckUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let result = this.authService.usernameAvailable(control.value).pipe(
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
