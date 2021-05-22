import { Inject, Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  IAuthenticationDetailsData,
  ICognitoUserAttributeData,
  ICognitoUserData,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import { AuthenticateForm } from './authenticate-form';

export type AuthenticateResponse = 'SUCCESS' | 'NEW_PASSWORD_REQUIRED';
export type GetCurrentSessionResponse = 'SUCCESS' | 'NO_USER_IN_SESSION' | 'SESSION_INVALID';
export interface ICognitoSignupParams {
  username: string;
  password: string;
  attributes: ICognitoUserAttributeData[];
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  authtenticateForm = new AuthenticateForm({ password: '', userName: '' });

  /** Cognito User Session observable */
  private session = new BehaviorSubject<CognitoUserSession | null>(null);
  get session$(): Observable<CognitoUserSession | null> {
    return this.session.asObservable();
  }

  /** Cognito JWT Token */
  get token(): string | null {
    return this.session.value ? this.session.value.getIdToken().getJwtToken() : null;
  }

  /** Cognito User ID */
  get userId(): string | null {
    return this.session.value ? this.session.value.getIdToken().payload.sub as string : null;
  }

  /** Valid Cognito Session */
  get logged(): boolean {
    return this.session.value ? this.session.value.isValid() : false;
  }
  /** Valid Cognito Session as observable */
  get logged$(): Observable<boolean> {
    return this.session$.pipe(map(session => session ? session.isValid() : false));
  }

  /** Current Cognito User */
  get currentUser(): CognitoUser | null {
    return this.userPool ? this.userPool.getCurrentUser() : null;
  }

  constructor(@Inject('userPool') private userPool: CognitoUserPool) { }

  /** Try to register a User to the Cognito User Pool */
  public signUp(userName: string, password: string, attributes?: ICognitoUserAttributeData[]): Observable<ISignUpResult> {

    return new Observable(observer => {
      let cognitoAttributes: CognitoUserAttribute[] = [];

      if (!userName) {
        observer.error("userName required");
      }

      if (!password) {
        observer.error("password is required");
      }

      if (attributes) {
        cognitoAttributes = attributes.map(attr => new CognitoUserAttribute(attr));
      }

      this.userPool.signUp(userName, password, cognitoAttributes, [], (error, result) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(result as ISignUpResult);
        }
      })
    })
  }

  /** Confirms a registered user using code received by email or SMS */
  public confirmRegisteredUser(userName: string, confirmationCode: string): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        try {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const user = new CognitoUser({ Username: userName, Pool: this.userPool });
          user.confirmRegistration(confirmationCode, false, (err, _) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
        } catch (err) {
          reject(err);
        }
      })
    );
  }

  /**
   * Resend confirmation code for selected user
   *
   * @param userName user name
   */
  public resendConfirmationCode(userName: string): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        try {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const user = new CognitoUser({ Username: userName, Pool: this.userPool });
          user.resendConfirmationCode((err, _) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
        } catch (error) {
          reject(error);
        }
      })
    );
  }

  /**
   * Login the user with provided authentication details
   *
   * @param userName user name
   * @param password user password
   */
  public authenticate(userName: string, password: string): Observable<AuthenticateResponse> {

    return from(
      new Promise<AuthenticateResponse>((resolve, reject) => {

        try {

          // eslint-disable-next-line @typescript-eslint/naming-convention
          const authenticationDetails: AuthenticationDetails = new AuthenticationDetails({ Username: userName, Password: password });
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const cognitoUser: CognitoUser = new CognitoUser({ Username: userName, Pool: this.userPool });

          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: cognitoUserSession => {
              this.session.next(cognitoUserSession);
              // TODO Manage new credentials https://www.npmjs.com/package/amazon-cognito-identity-js
              resolve('SUCCESS');
            },
            onFailure: error => {
              reject(error);
              this.session.next(null);
            },
            newPasswordRequired: (_: unknown, __: unknown) => {
              resolve('NEW_PASSWORD_REQUIRED');
            }
          });

        } catch (error) {
          reject(error);
        }
      })
    );
  }

  /**
   * Check user in local storage and return the session
   * @returns True: Valid Session | False: No valid session
   */
  public getCurrentUserSession(): Observable<boolean> {

    return new Observable(observer => {1

      if (!this.currentUser) {
        observer.next(false)
      } else {

        this.currentUser.getSession((error: Error | null, session: CognitoUserSession | null) => {

          if (error) {
            observer.error(error);
          }

          if (session) {

            this.session.next(session);

            if (session.isValid()) {
              observer.next(true);
            }

          }

          this.session.next(null);
          observer.next(false);
        })
      }

    })
  }

  /** Delete the current authenticated user */
  public deleteUser(): Observable<string> {

    return new Observable(observer => {

      if (!this.currentUser) {
        observer.error("No authenticated user");
      } else {

        this.currentUser.deleteUser((error, result) => {
          if (error) {
            observer.error(error)
          } else {
            observer.next(result)
          }
        })

      }

    })

  }


  /** Complete the password Challenge */
  public completePasswordChallenge(authenticationDetailsData: IAuthenticationDetailsData): Observable<void> {

    return from(
      new Promise<void>((resolve, reject) => {

        try {

          // eslint-disable-next-line @typescript-eslint/naming-convention
          const cognitoUserData: ICognitoUserData = { Pool: this.userPool, Username: authenticationDetailsData.Username };
          const cognitoUser: CognitoUser = new CognitoUser(cognitoUserData);

          if (!authenticationDetailsData.Password) {
            reject('No password provided');
          } else {
            cognitoUser.completeNewPasswordChallenge(authenticationDetailsData.Password, null, {
              onSuccess: userSession => {
                this.session.next(userSession);
                resolve();
              },
              onFailure: error => {
                reject(error);
              }
            });
          }

        } catch (error) {
          reject(error);
        }
      })
    );
  }

  /** SignOut current User */
  public signOut(): Observable<void> {

    return new Observable(observer => {

      const cognitoUser = this.userPool.getCurrentUser();

      if (cognitoUser) {
        cognitoUser.signOut();
        this.session.next(null);
        observer.next();
      }

      observer.error('No User Loged In');

    });

  }
}
