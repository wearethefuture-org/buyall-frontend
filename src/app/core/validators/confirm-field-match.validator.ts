import { AbstractControl, ValidatorFn } from '@angular/forms';

const ConfirmFieldMatchValidator = (first: string, second: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const firstFormControl = control.get(`${first}`);
    const secondFormControl = control.get(`${second}`);

    if (firstFormControl.value === secondFormControl.value) {
      secondFormControl.setErrors({MathField: false})
      return null;
    } else {
      secondFormControl.setErrors({MathField: true})
      return {MathField: true};
    }
  }
}

export default ConfirmFieldMatchValidator;