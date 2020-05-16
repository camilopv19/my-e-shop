import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { url } from './url-validator';

const URL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UrlDirective),
  multi: true
};

@Directive({
  selector: '[url][formControlName],[url][formControl],[url][ngModel]',
  providers: [URL_VALIDATOR]
})

export class UrlDirective implements Validator {
  @Input() url: string;

  validate(c: AbstractControl): {[key: string]: any} {
    return url(c);
  }
}
