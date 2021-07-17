import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  BurgerFormConfiguration,
  loadDefaultBurgerFormConfiguration,
} from 'src/app/data/burger-form-configuration';
import { BurgerType } from 'src/app/data/burger-type.enum';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-burger-form',
  templateUrl: './burger-form.component.html',
  styleUrls: ['./burger-form.component.css'],
})
export class BurgerFormComponent implements OnInit {
  burgerFormConfiguration: BurgerFormConfiguration;
  orderForm: FormGroup;
  isSendingForm = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
    this.burgerFormConfiguration = loadDefaultBurgerFormConfiguration();
  }

  private initializeForm(): void {
    this.orderForm = new FormGroup({
      bunType: new FormControl(null, Validators.required),
      burgers: new FormArray(
        [],
        [CustomValidators.minLengthArray(1), CustomValidators.maxLengthArray(3)]
      ),
      toppings: new FormArray(
        [],
        [CustomValidators.minLengthArray(1), CustomValidators.maxLengthArray(5)]
      ),
    });

    this.addBurger();
    this.addTopping();
  }

  // BURGERS SECTION
  get burgerControls(): AbstractControl[] {
    return this.burgerArray.controls;
  }

  private get burgerArray(): FormArray {
    return this.orderForm.controls.burgers as FormArray;
  }

  addBurger(): void {
    const newBurgersGroup = this.createBurgersGroup();
    const newBurgersGroupControls = newBurgersGroup.controls;

    newBurgersGroupControls.type.valueChanges.subscribe((value: any) => {
      this.handleBurgerTypeValueChange(
        value,
        newBurgersGroupControls.degreeOfDoneness
      );
    });

    (this.burgerArray as FormArray).controls.push(newBurgersGroup);
    this.burgerArray.updateValueAndValidity();
  }

  private createBurgersGroup(): FormGroup {
    return new FormGroup({
      type: new FormControl(null, Validators.required),
      degreeOfDoneness: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  private handleBurgerTypeValueChange(
    newValue: BurgerType,
    degreeOfDonenessControl: AbstractControl
  ): void {
    const meatOptions = [BurgerType.BEEF, BurgerType.BEEF_ANGUS];
    if (meatOptions.includes(newValue)) {
      degreeOfDonenessControl.enable();
    } else {
      degreeOfDonenessControl.setValue(null);
      degreeOfDonenessControl.disable();
    }
  }

  deleteBurger(index: number): void {
    this.burgerControls.splice(index, 1);
    this.burgerArray.updateValueAndValidity();
  }

  // TOPPINGS SECTION
  get toppingControls(): AbstractControl[] {
    return this.toppingArray.controls;
  }

  private get toppingArray(): FormArray {
    return this.orderForm.controls.toppings as FormArray;
  }

  addTopping(): void {
    const topping = this.createToppingControl();
    this.toppingControls.push(topping);
    this.toppingArray.updateValueAndValidity();
  }

  private createToppingControl(): FormControl {
    return new FormControl(null, Validators.required);
  }

  deleteTopping(index: number): void {
    this.toppingControls.splice(index, 1);
    this.toppingArray.updateValueAndValidity();
  }

  // ERRORS
  get burgersArrayErrorMsg(): string | null {
    const errors = this.burgerArray.errors;
    return this.arrayErrorMsg(errors);
  }

  get toppingsArrayErrorMsg(): string | null {
    const errors = this.toppingArray.errors;
    return this.arrayErrorMsg(errors);
  }

  private arrayErrorMsg(errors: ValidationErrors): string | null {
    const minLengthError = errors?.minLengthArray;
    if (minLengthError) {
      return `Please choose at least ${minLengthError} position.`;
    }

    const maxLengthError = errors?.maxLengthArray;
    if (maxLengthError) {
      return `Please choose at most ${maxLengthError} positions.`;
    }

    return null;
  }

  // SUBMIT
  submitForm(): void {
    this.burgerArray.updateValueAndValidity();
    this.toppingArray.updateValueAndValidity();

    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSendingForm = true;
    console.log(this.orderForm.value);
  }
}
