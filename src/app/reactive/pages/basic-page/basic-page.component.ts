import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// Si me pasaran algo por el backend:
const rtx5090 = {
  name: 'RTX',
  price: 2500,
  inStorage: 10
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    //this.myForm.reset( rtx5090 );
  }

  // public myForm: FormGroup = new FormGroup( {
  // name: new FormControl('',[],[]),
  // price: new FormControl(''),
  //inStorage: new FormControl(''),
  // })

  public myForm: FormGroup = this.fb.group( {
    name: ['', [Validators.required, Validators.minLength(3)],],
    price: ['0', [Validators.required, Validators.min(0)]],
    inStorage: ['0',[Validators.required, Validators.min(0)]],
  })

  onSave():void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    }

    console.log(this.myForm.value);
   // this.myForm.reset({ price: 0, inStorage: 0 });
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    // Esto devuelve un objeto vacío o null
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      //console.log(Object.keys(errors));
      switch(key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters`;
      }
    }

    return null;
  }
}

