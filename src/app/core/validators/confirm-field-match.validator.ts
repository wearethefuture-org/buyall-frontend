import { AbstractControl, ValidatorFn } from '@angular/forms';

const ConfirmFieldMatchValidator = (first: string, second: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const firstFormControl = control.get(`${first}`);
    const secondFormControl = control.get(`${second}`);

    if (firstFormControl.value === secondFormControl.value) {
      if (secondFormControl.errors && secondFormControl.errors.matchField) {
        secondFormControl.setErrors(null);
      }
    } else {
      secondFormControl.setErrors({matchField: true});
    }

    return null;
  };
};

export default ConfirmFieldMatchValidator;
