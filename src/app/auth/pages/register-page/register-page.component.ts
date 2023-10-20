import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/services/email-validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern ) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFiledOneEqualFieldTwo('password','password2')
    ]
  });

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
