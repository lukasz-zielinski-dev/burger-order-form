import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static minLengthArray(min: number): ValidatorFn | null {
    return (c: AbstractControl): ValidationErrors => {
      if (c.value.length >= min) {
        return null;
      }
      return { minLengthArray: min };
    };
  }

  static maxLengthArray(max: number): ValidatorFn | null {
    return (c: AbstractControl): ValidationErrors => {
      if (c.value.length <= max) {
        return null;
      }
      return { maxLengthArray: max };
    };
  }
}
