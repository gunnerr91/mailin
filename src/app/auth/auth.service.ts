import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

interface Credentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private client: HttpClient) {}

  usernameAvailable(username: string) {
    return this.client.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username',
      {
        username,
      }
    );
  }

  signup(credentials: Credentials) {
    return this.client.post<SignupResponse>(this.rootUrl + '/auth/signup', {
      credentials,
    });
  }
}
