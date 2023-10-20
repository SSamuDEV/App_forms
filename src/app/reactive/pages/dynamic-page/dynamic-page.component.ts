import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor( private fb: FormBuilder ) {}

  public myForm: FormGroup = this.fb.group( {
    name: ['',[ Validators.required, Validators.minLength(3) ]],
    favourite_games: this.fb.array([
      [ 'Metal gear', Validators.required ],
      [ 'Sonic Mania', Validators.required ],
    ])
  });

  public newFavourite: FormControl = new FormControl('', [ Validators.required ]);


  get favouriteGames() {
    return this.myForm.get('favourite_games') as FormArray;
  }

  onSubmit():void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
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

  onAddToFavourites() {
    if (this.newFavourite.invalid) return;

    const newGame = this.newFavourite.value;

    //console.log(this.fb.control(newGame, Validators.required));

    this.favouriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavourite.reset();
  }

  onDeleteFavourite(index: number) {
    this.favouriteGames.removeAt(index);
  }



}
