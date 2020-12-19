# NgTypedForm

## Features
Provides an angular service to generate typed reactive forms.

The interface for typed forms is inspired from https://gist.github.com/dmorosinotto/76a9272b5c45af1f78a61e7894df5777#file-typedforms-d-ts

## Installation
1. Install the Package with `npm install @poseclop/ng-typed-form`
2. Import the module in your application
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgTypedFormModule
        ]
    })
    ```

### Usage
All methods are available via the `NgTypedFormService`.

## Limitations
Currently, the service will generate a FormArray form any array provided as default values. Arrays with varying types are not supported.

This package has not been tested rigorously. Use at you own rish and peril

## Todo
Allow the user to provide reactive form configuration
Manage form arrays with different types
Allow FormControls with values of type Array
Manage null values
Manage interface declaration with partial default value

