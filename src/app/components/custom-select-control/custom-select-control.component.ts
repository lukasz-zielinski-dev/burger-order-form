import { Component, forwardRef, Input, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgForm,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SelectableOption } from 'src/app/data/selectable-option';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-custom-select-control',
  templateUrl: './custom-select-control.component.html',
  styleUrls: ['./custom-select-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectControlComponent),
      multi: true,
    },
  ],
})
export class CustomSelectControlComponent implements ControlValueAccessor {
  matcher = new MyErrorStateMatcher();

  value: any;

  @Input() label: string;
  @Input() selectableOptions: Set<SelectableOption>;
  @Input() formControlName: string;

  disabled = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(@Optional() private controlContainer: ControlContainer) {}

  get control(): AbstractControl {
    return this.controlContainer.control.get(String(this.formControlName));
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
