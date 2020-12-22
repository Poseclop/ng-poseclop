# NgTypedForm

Provides an angular service to generate typed reactive forms.

The interface for typed forms is inspired from [this gist](https://gist.github.com/dmorosinotto/76a9272b5c45af1f78a61e7894df5777#file-typedforms-d-ts)

:warning: This module was not tested in depth for production. Use at your own risk and peril.

## Installation
1. Install the Package with `npm install @poseclop/ng-typed-form`
2. Import the module in your application (ReactiveFormsModule also required)
    ```Typescript
    @ngModule({
        ...,
        imports: [
            ...,
            NgTypedFormModule,
            ReactiveFormsModule
        ]
    })
    ```

## API
### NgTypedFormService
###### Methods
Name | Return | Description
---- | ------ | -----------
`generateTypedFormControl<T>(value: T, config?: IPosConfig)` | `TypedFormGroup<T>` | Generate a typed FormGroup
`generateTypedFormArray<T>(value: T, config?: IPosConfig)` | `TypedFormArray<T>` | Generate a typed FormArray (type: T[])
`generateTypedFormGroup<T>(value: T: config?: PosFormCongif)` | `TypedFormGroup<T>` | Generate a typed FormGroup
###### IPosConfig
Name | Description
---- | -----------
`disabled: boolean` | disable the control (default: false)
`nullDefault: boolean` | nullify the default value (default: false)
`validators: Validator | Validator[]` | set the default validators
###### PosFormConfig<T>
An object partially matching T with IPosConfig assigned to each value.

## Limitations
Currently, the service will generate a FormArray form any array provided as default values. Arrays with varying types are not supported.

This package has not been tested rigorously. Use at you own rish and peril

## Todo
- [ ] Allow the user to provide reactive form configuration
- [ ] Manage form arrays with different types
- [ ] Allow FormControls with values of type Array
- [X] Manage null values
- [ ] Manage interface declaration with partial default value

