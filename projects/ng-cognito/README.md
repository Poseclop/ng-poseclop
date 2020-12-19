# NgCognito
This Angular library provide a service that allows an easy interaction with AWS Cognito Identity SDK.

3 modules are provided:
1. NgCognitoServiceModule: Allows interaction with cognito identity pool via the CognitoService
2. NgCongitoInterceptorModule: Adds Cognito auth header to all http requests
3. NgGuardsModule: Provide LoggedGuards and NonLoggedGuards

### Dependencies
[Amazon Cognito Identity SDK for JavaScript](https://www.npmjs.com/package/amazon-cognito-identity-js)

### Installation
1. Install the Package with `npm install @poseclop/ng-cognito`
2. Install [Amazon Cognito Identity SDK](https://www.npmjs.com/package/amazon-cognito-identity-js)
3. Add `(window as any).global = window;` to polyfill.ts (needed for Amazon Cognito Identiy SDK to work)
#### Cognito Service
1. Setup your user Pool
    ```
    const pool = new CognitoUserPool({
        UserPoolId: 'myUserPoolId',
        ClientId: 'myClientId'
    });
    ```
2. Import the module with it's associated pool in your application
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgCognitoServiceModule.forRoot(pool)
        ]
    })
    ```
#### Cognito Guards
1. Setup the redirect routes
    ```
    const guardsConfig: ICognitoGuardsConfig = {
        loggedOut: ['/', 'login'],
        loggedIn: ['/', 'home']
    };
    ```
2. Import the guard module in you application
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgCognitoGuardsModule.forRoot(pool)
        ]
    })
    ```
#### Cognito Interceptors
1. Import the interceptor module in your application
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgCognitoInterceptorModule
        ]
    })
    ```

### Usage
All methods are available via the `PosCognitoService`.

### API
#### PosCognitoService
**Properties**
Name | Description
---- | -----------
session: CognitoUserSession | The User session
token: string | The User authentication token
userId: string | The unique ID of the User
logged: boolean | Is the User session valid?
user: CognitoUser | The cognito User

**Methods**
Name | Description
---- | -----------
login(authenticationDetailsData: IAuthenticationDetailsData): Observable\<PosCognitoServiceResponse> | Login the user with provided authentication details
authenticate(): Observable\<PosCognitoServiceResponse> | Authenticate the user on current Session
completePasswordChallenge(authenticationDetailsData: IAuthenticationDetailsData): Observable<\PosCognitoServiceResponse> | Complete the password Challenge
logout(): Observable<\PosCognitoServiceResponse> | Logout current User

### Todo
[ ] Manage Cognito User Attributes
[ ] Manage confirmRegistration
[ ] Manage Resend Confirmation Code
[ ] Manage getUserAttributes
[ ] Manage User attributes (verify/add/delete/update)
[ ] Manage MFA (enable/disabled/get)
[ ] Manage ChangePassword
[ ] Manage forgot Password
[ ] Manage delete User
[ ] Manage devices