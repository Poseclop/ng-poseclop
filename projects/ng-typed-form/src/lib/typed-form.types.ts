/**
 * INSPIRED FROM https://gist.github.com/dmorosinotto/76a9272b5c45af1f78a61e7894df5777#file-typedforms-d-ts
 */

import { ValidatorFn } from '@angular/forms';

// * BASIC DATA TYPES
export type DataType = null | boolean | number | string | symbol | bigint | object | Array<DataType>;

// * BASIC TYPES DEFINED IN @angular/forms + rxjs/Observable
export type FormGroup = import('@angular/forms').FormGroup;
export type FormArray = import('@angular/forms').FormArray;
export type FormControl = import('@angular/forms').FormControl;
export type AbstractControl = import('@angular/forms').AbstractControl;
export type Observable<T> = import('rxjs').Observable<T>;

export interface IPosControlConfig {
    nullDefault?: boolean;
    disabled?: boolean;
    validators?: ValidatorFn | ValidatorFn[] | null | undefined;
}

export type PosFormConfig<T> = T extends Array<any>
    ? Array<PosFormConfig<T[0]>>
    : T extends object
    ? { [K in keyof Partial<T>]: PosFormConfig<T[K]> }
    : IPosControlConfig;

// * TYPES FOR CONTROLS INSIDE FORMGROUPS AND FORMARRAYS
export type FormArrayControl<T> = T extends Array<any> ? FormArrayTyped<T[0]> : T extends object ? FormGroupTyped<T> : FormControlTyped<T>;
export type FormGroupControl<T, P extends keyof T> = T[P] extends Array<any>
    ? FormArrayTyped<T[P][0]>
    : T[P] extends object
    ? FormGroupTyped<T[P]>
    : FormControlTyped<T[P]>;


// ! I don't know why Angular Team doesn't define it https://github.com/angular/angular/blob/7.2.7/packages/forms/src/model.ts#L15-L45)
export type STATUS = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

// ! string is added only becouse Angular base class use string insted of union export type
// ! https://github.com/angular/angular/blob/7.2.7/packages/forms/src/model.ts#L196)
export type STATUSs = STATUS | string;

// * BASE PROPS AND METHODS COMMON TO ALL FormControl/FormGroup/FormArray
export interface AbstractControlTyped<T> extends AbstractControl {
    readonly value: T;
    valueChanges: Observable<T>;
    readonly status: STATUSs;
    statusChanges: Observable<STATUS>;
    get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;
    setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

// ! COPIED FROM AbstractControlTyped<T> BECOUSE TS NOT SUPPORT MULPILE extends FormControl, AbstractControlTyped<T>
export interface FormControlTyped<T> extends FormControl {
    readonly value: T;
    valueChanges: Observable<T>;
    readonly status: STATUSs;
    statusChanges: Observable<STATUS>;
    setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

// * PROPS AND METHODS SPECIFIC OF FormGroup
export interface FormGroupTyped<T> extends FormGroup {
    controls: { [P in keyof T]: FormGroupControl<T, P> };
    readonly value: T;
    valueChanges: Observable<T>;
    readonly status: STATUSs;
    statusChanges: Observable<STATUS>;
    registerControl<P extends keyof T>(name: P, control: FormGroupControl<T, P>): void;
    registerControl<V = any>(name: string, control: AbstractControlTyped<V>): AbstractControlTyped<V>;
    addControl<P extends keyof T>(name: P, control: FormGroupControl<T, P>): void;
    addControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
    removeControl(name: keyof T): void;
    removeControl(name: string): void;
    setControl<P extends keyof T>(name: P, control: FormGroupControl<T, P>): void;
    setControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
    contains(name: keyof T): boolean;
    contains(name: string): boolean;
    get<P extends keyof T>(path: P): FormGroupControl<T, P>;
    get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;
    getRawValue(): T & { [disabledProp in string | number]: any };
    setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

// * PROPS AND METHODS SPECIFIC OF FormArray
export interface FormArrayTyped<T> extends FormArray {
    controls: Array<FormArrayControl<T>>;
    readonly value: T[];
    valueChanges: Observable<T[]>;
    readonly status: STATUSs;
    statusChanges: Observable<STATUS>;
    at(index: number): FormArrayControl<T>;
    push<V = T>(ctrl: FormArrayControl<V>): void;
    insert<V = T>(index: number, control: FormArrayControl<V>): void;
    setControl<V = T>(index: number, control: FormArrayControl<V>): void;
    getRawValue(): T[];
    get(path: Array<string> | string): FormArrayControl<T>;
    get<V = unknown>(path: Array<string | number> | string): FormArrayControl<V> | null;
    setValue<V>(value: V extends T[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    patchValue<V>(value: V extends Partial<T>[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
    reset<V>(value?: V extends Partial<T>[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}
