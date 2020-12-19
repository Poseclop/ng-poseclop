import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder } from '@angular/forms';
import { DataType, FormArrayTyped, FormControlTyped, FormGroupTyped, IPosControlConfig, PosFormConfig } from './typed-form.types';

@Injectable({
  providedIn: 'root'
})
export class NgTypedFormService {

  constructor(
    private $fb: FormBuilder
  ) { }

  /**
   * Generate a new TypedFormControl with provided default value
   * @param defaultValue The default value of the formControl
   */
  generateTypedFormControl<T extends boolean | number | string | symbol | bigint>(defaultValue: T, config?: IPosControlConfig, key?: string)
    : FormControlTyped<T> {

    if (config) {
      const options: AbstractControlOptions = {
        validators: config?.validators
      };

      return this.$fb.control({
        value: config.nullDefault ? null : defaultValue,
        disabled: config.disabled ? true : false
      }, options);
    }
    return this.$fb.control(defaultValue);
  }

  /**
   * Generate a new TypedFormArray with provided default value
   * @param defaultValue The default value of the FormArray
   */
  generateTypedFormArray<T extends DataType>(defaultValue: Array<T>, config?: PosFormConfig<T> | IPosControlConfig, key?: string)
    : FormArrayTyped<T> {

    // ! Hack to avoid error on Object.keys
    let catchValue: Array<any> = defaultValue;

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
            return this.generateTypedFormControl(value, config as IPosControlConfig);
          } else if (value instanceof Array) {
            return this.generateTypedFormArray(value, config);
          } else if (value instanceof Object) {
            return this.generateTypedFormGroup(value as object, config as PosFormConfig<T>);
          } else {
            throw new Error(`object ${value} no supported`);
          }
        default:
          throw new Error(`Type ${typeof value} not supported`);
      }
    })) as FormArrayTyped<T>;
    return array;
  }

  /**
   * Generate a new TypedFormGroup with provided default value
   * @param defaultValue The default value of the FormGroup
   */
  generateTypedFormGroup<T extends {}>(defaultValue: T, config?: PosFormConfig<T>): FormGroupTyped<T> {

    const group: Partial<{ [K in keyof T]: AbstractControl }> = {};

    Object.keys(defaultValue).forEach(k => {

      // @ts-ignore
      const abstractConfig = config && config[k];

      // @ts-ignore
      switch (typeof defaultValue[k]) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
        case 'bigint':
          // @ts-ignore
          group[k] = this.generateTypedFormControl(defaultValue[k], abstractConfig, k);
          break;
        case 'object':
          // @ts-ignore
          if (group[k] === null) {
            // @ts-ignore
            group[k] = this.generateTypedFormControl(defaultValue[k], abstractConfig, k);
            // @ts-ignore
          } else if (defaultValue[k] instanceof Array) {
            // @ts-ignore
            group[k] = this.generateTypedFormArray(defaultValue[k], abstractConfig, k);
          } else {
            // @ts-ignore
            group[k] = this.generateTypedFormGroup(defaultValue[k], abstractConfig, k);
          }
      }
    });

    const formGroup = this.$fb.group(group) as FormGroupTyped<T>;
    return formGroup;
  }
}
