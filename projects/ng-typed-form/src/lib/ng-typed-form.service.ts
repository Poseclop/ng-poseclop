import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ControlDataType, DataType, FormArrayTyped, FormControlTyped, FormGroupDataType, FormGroupTyped } from './typed-form.types';

@Injectable({
  providedIn: 'root'
})
export class NgTypedFormService {

  constructor(
    private fb: FormBuilder
  ) { }

  /**
   * Generate a new TypedFormControl with provided default value
   *
   * @param defaultValue The default value of the formControl
   */
  generateTypedFormControl<T extends ControlDataType>(defaultValue: T): FormControlTyped<T> {
    return this.fb.control(defaultValue);
  }

  /**
   * Generate a new TypedFormArray with provided default value
   *
   * @param defaultValue The default value of the FormArray
   */
  generateTypedFormArray<T extends Array<DataType>>(defaultValue: T): FormArrayTyped<T> {

    const array = this.fb.array(defaultValue.map(value => {
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return this.generateTypedFormControl(value);
        case 'object':
          if (value === null) {
            throw new Error('Cannot take null as default value. Use PosFormConfig instead')
          } else if (value instanceof Array) {
            return this.generateTypedFormArray(value);
          } else if (value instanceof Object) {
            return this.generateTypedFormGroup(value);
          } else {
            throw new Error(`object ${String(value)} no supported`);
          }
        default:
          throw new Error(`Type ${typeof value} not supported`);
      }
    })) as FormArrayTyped<T>;
    return array;
  }

  /**
   * Generate a new TypedFormGroup with provided default value
   *
   * @param defaultValue The default value of the FormGroup
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateTypedFormGroup<T extends { [K: string]: any}>(defaultValue: T): FormGroupTyped<T> {

    const group: Partial<{ [K: string]: AbstractControl }> = {};

    Object.keys(defaultValue).forEach(k => {

      switch (typeof defaultValue[k]) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          group[k] = this.generateTypedFormControl(defaultValue[k] as ControlDataType);
          break;
        case 'object':
          if (defaultValue[k] === null) {
            throw new Error('Cannot take null as default value. Use PosFormConfig instead')
          } else if (defaultValue[k] instanceof Array) {
            group[k] = this.generateTypedFormArray(defaultValue[k] as DataType[]);
          } else {
            group[k] = this.generateTypedFormGroup(defaultValue[k] as FormGroupDataType);
          }
      }
    });

    const formGroup = this.fb.group(group) as FormGroupTyped<T>;
    return formGroup;
  }
}
