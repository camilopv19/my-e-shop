import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[min]',
  // selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatorDirective, multi: true}]
})
export class ValidatorDirective implements Validator {
  @Input() min: number;

  validate(control: AbstractControl): {[key: string]: any} | null {   //This fn returns an key-value pair containing an "error", or null

    return control.value < 0 ? { 'min': true } : null;
  }
}