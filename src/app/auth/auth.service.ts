import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient) {}

  usernameAvailable(username: string) {
    return this.client.post<UsernameAvailableResponse>(
      'https://api.angular-email.com/auth/username',
      {
        username,
      }
    );
  }

  signup(credentials: any) {
    return this.client.post<any>('https://api.angular-email.com/auth/signup', {
      credentials,
    });
  }
}
