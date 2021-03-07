import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { DataType, FormArrayTyped, FormControlTyped, FormGroupDefaultValues, FormGroupTyped, IPosControlConfig, PosFormConfig } from './typed-form.types';

@Injectable({
  providedIn: 'root'
})
export class NgTypedFormService {

  constructor(
    private $fb: FormBuilder
  ) { }

  /**
   * Generate a new TypedFormControl with provided default value
   *
   * @param defaultValue The default value of the formControl
   */
  generateTypedFormControl<T extends boolean | number | string | symbol | bigint>(defaultValue: T, config?: IPosControlConfig): FormControlTyped<T> {

    if (config) {
      return this.$fb.control({
        value: config.nullDefault ? null : defaultValue,
        disabled: config.disabled ? true : false
      }, config.options ? config.options : null);
    }
    return this.$fb.control(defaultValue);
  }

  /**
   * Generate a new TypedFormArray with provided default value
   *
   * @param defaultValue The default value of the FormArray
   */
  generateTypedFormArray<T extends DataType>(defaultValue: Array<T>, config?: PosFormConfig<T> | IPosControlConfig): FormArrayTyped<T> {

    // ! Hack to avoid error on Object.keys
    let catchValue: Array<T> = defaultValue;

    if (defaultValue === null) {
      catchValue = [];
    }

    const array = this.$fb.array(catchValue.map(value => {
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
          return this.generateTypedFormControl(value, config as IPosControlConfig);
        case 'object':
          if (value === null) {
            throw new Error('Cannot take null as default value. Use PosFormConfig instead')
          } else if (value instanceof Array) {
            return this.generateTypedFormArray(value, config);
          } else if (value instanceof Object) {
            return this.generateTypedFormGroup(value as FormGroupDefaultValues, config as PosFormConfig<FormGroupDefaultValues>);
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
  generateTypedFormGroup<T extends Record<string, any>>(defaultValue: T, config?: PosFormConfig<T>): FormGroupTyped<T> {

    const group: Partial<{ [K: string]: AbstractControl }> = {};

    Object.keys(defaultValue).forEach(k => {

      const abstractConfig = config ? config[k] : undefined;

      switch (typeof defaultValue[k]) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
          group[k] = this.generateTypedFormControl(defaultValue[k] as boolean | number | string | symbol | bigint, abstractConfig as IPosControlConfig);
          break;
        case 'object':
          if (defaultValue[k] === null) {
            throw new Error('Cannot take null as default value. Use PosFormConfig instead')
          } else if (defaultValue[k] instanceof Array) {
            group[k] = this.generateTypedFormArray(defaultValue[k] as DataType[], abstractConfig as IPosControlConfig);
          } else {
            group[k] = this.generateTypedFormGroup(defaultValue[k] as FormGroupDefaultValues, abstractConfig as PosFormConfig<{ [K: string]: DataType}>);
          }
      }
    });

    const formGroup = this.$fb.group(group) as FormGroupTyped<T>;
    return formGroup;
  }
}
