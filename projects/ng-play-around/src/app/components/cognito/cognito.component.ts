import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CognitoService, ICognitoSignupParams } from 'projects/ng-cognito/src/public-api';
import { FormGroupTyped, NgTypedFormService } from 'projects/ng-typed-form/src/public-api';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface cognitoSignupFormValues extends ICognitoSignupParams {
  confirmPassword: string;
}

@Component({
  selector: 'play-around-cognito',
  templateUrl: './cognito.component.html',
  styleUrls: ['./cognito.component.scss']
})
export class CognitoComponent implements OnInit {

  cognitoSignUpForm: FormGroupTyped<cognitoSignupFormValues>;
  logged$ = this.cognito.logged$;
  validSession$ = this.cognito.session$.pipe(map(session => session ? session.isValid() : false));
  currentUser = this.cognito.currentUser ? this.cognito.currentUser.getUsername() : 'null';
  private error = new BehaviorSubject<string | null>(null);

  error$ = this.error.asObservable();

  constructor(
    private cognito: CognitoService,
    typedForm: NgTypedFormService
  ) {

    const values: cognitoSignupFormValues = {
      password: '',
      confirmPassword: '',
      username: '',
      attributes: [{ Name: 'email', Value: ''}],
    }

    this.cognitoSignUpForm = typedForm.generateTypedFormGroup(values);
    this.cognitoSignUpForm.controls.password.setValidators(Validators.required.bind(this));
    this.cognitoSignUpForm.controls.confirmPassword.setValidators(Validators.required.bind(this));
    this.cognitoSignUpForm.controls.username.setValidators(Validators.required.bind(this));
    this.cognitoSignUpForm.controls.attributes.controls.forEach(control => control.controls.Value.setValidators([Validators.required.bind(this), Validators.email.bind(this)]))
  }

  ngOnInit(): void {
    this.cognito.getCurrentUserSession()
      .pipe(
        catchError(error => {
          console.warn(error)
          return EMPTY;
        })
      )
      .subscribe(response => {
        console.warn('Get Current user Session: ', response);
      })
  }

  onSubmitCognitoSignUpForm(): void {

    this.cognito.signUp(this.cognitoSignUpForm.value.username, this.cognitoSignUpForm.value.password, this.cognitoSignUpForm.value.attributes).pipe(
      map(response => console.warn(response)),
      catchError((error: Error) => {
        this.error.next(error.message);
        return EMPTY;
      })
    ).subscribe(response => {
      console.warn(response);
    });

  }

  onDeleteUserClick(): void {
    this.cognito.deleteUser();
  }

  printForm(): void {
    console.log(this.cognitoSignUpForm);
  }

}
