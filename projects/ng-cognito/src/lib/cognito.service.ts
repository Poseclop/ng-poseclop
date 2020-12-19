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

export type AuthenticateResponse = 'SUCCESS' | 'NEW_PASSWORD_REQUIRED';
export type GetCurrentSessionResponse = 'SUCCESS' | 'NO_USER_IN$session' | 'SESSION_INVALID';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  /** Cognito User Session */
  private $session: CognitoUserSession | null = null;
  get session(): CognitoUserSession | null {
    return this.$session || null;
  }

  /** Cognito User Session observable */
  private $session$ = new BehaviorSubject<CognitoUserSession | null>(null);
  get session$(): Observable<CognitoUserSession | null> {
    return this.$session$.asObservable();
  }

  /** Cognito JWT Token */
  get token(): string | null {
    return this.session ? this.session.getIdToken().getJwtToken() : null;
  }

  /** Cognito User ID */
  get userId(): string | null {
    return this.session ? this.session.getIdToken().payload.sub : null;
  }

  /** Valid Cognito Session */
  get logged(): boolean {
    return this.session ? this.session.isValid() : false;
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

  /** Generate a CognitoUserAttribute */
  public generateCognitoAttribute(data: ICognitoUserAttributeData): CognitoUserAttribute {
    return new CognitoUserAttribute(data);
  }

  /**
   * Try to register a User to the Cognito User Pool
   * @param userDetails The user name and password
   * @param attributes The Use attributes (some might be required)
   */
  public registerUser(userDetails: IAuthenticationDetailsData, attributes: ICognitoUserAttributeData[])
    : Observable<ISignUpResult> {
    return from(
      new Promise<ISignUpResult>((resolve, reject) => {
        try {
          if (!userDetails.Password) {
            throw new Error('No Password provided');
          }

          const cognitoAttributes = attributes.map(attr => this.generateCognitoAttribute(attr));

          this.userPool.signUp(userDetails.Username, userDetails.Password, cognitoAttributes, [], (err, result) => {
            if (err) {
              reject(err);
            }

            if (result) {
              resolve(result);
            }
          });
        } catch (err) {
          reject(err);
        }
      })
    );
  }

  /**
   * Confirms a registered user using code received by email or SMS
   * @param userName user name
   * @param confirmationCode confirmation code received via email
   */
  public confirmRegisteredUser(userName: string, confirmationCode: string): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        try {
          const user = new CognitoUser({ Username: userName, Pool: this.userPool });
          user.confirmRegistration(confirmationCode, false, (err, result) => {
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
   * @param userName user name
   */
  public resendConfirmationCode(userName: string): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        try {
          const user = new CognitoUser({ Username: userName, Pool: this.userPool });
          user.resendConfirmationCode((err, result) => {
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
   * @param userName user name
   * @param password user password
   */
  public authenticate(userName: string, password: string): Observable<AuthenticateResponse> {

    return from(
      new Promise<AuthenticateResponse>((resolve, reject) => {

        try {

          const authenticationDetails: AuthenticationDetails = new AuthenticationDetails({ Username: userName, Password: password });
          const cognitoUser: CognitoUser = new CognitoUser({ Username: userName, Pool: this.userPool });

          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: cognitoUserSession => {
              this.$session = cognitoUserSession;
              this.$session$.next(cognitoUserSession);
              // TODO Manage new credentials https://www.npmjs.com/package/amazon-cognito-identity-js
              resolve('SUCCESS');
            },
            onFailure: error => {
              reject(error);
            },
            newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
              resolve('NEW_PASSWORD_REQUIRED');
            }
          });

        } catch (error) {
          reject(error);
        }
      })
    );
  }

  /** Authenticate the user on current Session */
  public getCurrentUserSession(): Observable<GetCurrentSessionResponse> {

    return from(
      new Promise<GetCurrentSessionResponse>((resolve, reject) => {

        try {

          if (!this.currentUser) {
            resolve('NO_USER_IN$session');
          } else {

            this.currentUser.getSession((error: Error, session: CognitoUserSession | null) => {

              if (error) {
                reject(error);
              } else if (session && session.isValid()) {
                this.$session = session;
                this.$session$.next(session);
                resolve('SUCCESS');
              }

              resolve('SESSION_INVALID');

            });
          }

        } catch (error) {
          reject(error);
        }
      })
    );
  }


  /** Complete the password Challenge */
  public completePasswordChallenge(authenticationDetailsData: IAuthenticationDetailsData): Observable<void> {

    return from(
      new Promise<void>((resolve, reject) => {

        try {

          const cognitoUserData: ICognitoUserData = { Pool: this.userPool, Username: authenticationDetailsData.Username };
          const cognitoUser: CognitoUser = new CognitoUser(cognitoUserData);

          if (!authenticationDetailsData.Password) {
            reject('No password provided');
          } else {
            cognitoUser.completeNewPasswordChallenge(authenticationDetailsData.Password, null, {
              onSuccess: userSession => {
                this.$session = userSession;
                this.$session$.next(userSession);
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

  /** Logout current User */
  public logout(): Observable<void> {

    return from(
      new Promise<void>((resolve, reject) => {

        try {

          const cognitoUser = this.userPool.getCurrentUser();

          if (cognitoUser) {
            cognitoUser.signOut();
            this.$session = null;
            this.$session$.next(null);
            resolve();
          } else {
            reject('No user signed in');
          }

        } catch (err) {
          reject(err);
        }

      })
    );
  }
}
