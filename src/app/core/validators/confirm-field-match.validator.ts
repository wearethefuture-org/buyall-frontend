import { AbstractControl, ValidatorFn } from '@angular/forms';

const ConfirmFieldMatchValidator = (first: string, second: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const firstFormControl = control.get(`${first}`);
    const secondFormControl = control.get(`${second}`);

    if (firstFormControl.value === secondFormControl.value) {
      const errors = secondFormControl.errors ? Object.assign(secondFormControl.errors, {MathField: false}) : {matchField: false};
      secondFormControl.setErrors(errors)
    } else {
      const errors = secondFormControl.errors ? Object.assign(secondFormControl.errors, {MathField: true}) : {matchField: true};
      secondFormControl.setErrors(errors)
    }

    return null;
  }
}

export default ConfirmFieldMatchValidator;