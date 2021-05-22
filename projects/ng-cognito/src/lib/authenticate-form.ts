/* eslint-disable @typescript-eslint/unbound-method */
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class AuthenticateForm extends FormGroup {
  constructor(defaultValues: {userName: string, password: string}) {
    super({
      userName: new FormControl(defaultValues.userName, Validators.required),
      password: new FormControl(defaultValues.password, Validators.required),
    });
  }
}
