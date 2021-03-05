import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgTypedFormService } from './ng-typed-form.service';
import { IPosControlConfig, PosFormConfig } from './typed-form.types';

const mockFormGroupObject = {
  firstNames: ['John', 'Jean', 'Mike'],
  lastName: 'Doe',
  age: 32,
  hero: true,
  address: {
    street: 'bank street',
    streetNumber: 7,
    city: true,
    homes: [{ name: 'home1', street: 'street1' }, { name: 'home2', street: 'street2' }]
  },
  other: null,
  array: [null],
  array2: [[]],
  array3: [true, false],
  array4: [1, 2, 3]
};

describe('NgTypedFormService', () => {
  let service: NgTypedFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(NgTypedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('FormControl:', () => {
    it('should generate a form control with correct value', () => {
      const test1 = service.generateTypedFormControl(mockFormGroupObject.lastName);
      const test2 = service.generateTypedFormControl(mockFormGroupObject.age);
      const test3 = service.generateTypedFormControl(mockFormGroupObject.hero);
      expect(test1).toBeInstanceOf(FormControl);
      expect(test2).toBeInstanceOf(FormControl);
      expect(test3).toBeInstanceOf(FormControl);
    });

    it('should set the correct values to all types', () => {
      const test1 = service.generateTypedFormControl(mockFormGroupObject.lastName);
      const test2 = service.generateTypedFormControl(mockFormGroupObject.age);
      const test3 = service.generateTypedFormControl(mockFormGroupObject.hero);
      expect(test1.value).toBe(mockFormGroupObject.lastName);
      expect(test2.value).toBe(mockFormGroupObject.age);
      expect(test3.value).toBe(mockFormGroupObject.hero);
    });

    it('should set validator using config', () => {
      const config: IPosControlConfig = { validators: Validators.required };
      const test = service.generateTypedFormControl(mockFormGroupObject.lastName, config);
      test.setValue('');

      expect(test.valid).toBe(false);
    });

    it('should set multiple validators using config', () => {
      const config: IPosControlConfig = { validators: [Validators.required, Validators.requiredTrue] };
      const test = service.generateTypedFormControl(mockFormGroupObject.hero, config);
      test.setValue(false);

      expect(test.valid).toBe(false);
    });

    it('should nullify default value using config', () => {
      const config: IPosControlConfig = { nullDefault: true };
      const test = service.generateTypedFormControl(mockFormGroupObject.age, config);
      expect(test.value).toBeNull();
    });

    it('should disable form control using config', () => {
      const config: IPosControlConfig = { disabled: true };
      const test = service.generateTypedFormControl(mockFormGroupObject.age, config);
      expect(test.disabled).toBeTrue();
    });
  });

  describe('FormArray:', () => {
    it('should generate FormArrays', () => {
      const test1 = service.generateTypedFormArray(mockFormGroupObject.firstNames);
      const test2 = service.generateTypedFormArray(mockFormGroupObject.address.homes);
      expect(test1).toBeInstanceOf(FormArray);
      expect(test2).toBeInstanceOf(FormArray);
    });

    it('should generate FormArrays with correct values', () => {
      const test1 = service.generateTypedFormArray(mockFormGroupObject.firstNames);
      const test2 = service.generateTypedFormArray(mockFormGroupObject.address.homes);
      expect(test1.length).toBe(mockFormGroupObject.firstNames.length);
      expect(test1.controls[0].value).toBe(mockFormGroupObject.firstNames[0]);
      expect(test2.controls[0].controls.name.value).toBe(mockFormGroupObject.address.homes[0].name);
    });

    it('should set validator to all controls using config', () => {
      const config: IPosControlConfig = { validators: Validators.required };
      const test1 = service.generateTypedFormArray(mockFormGroupObject.firstNames, config);
      test1.controls[1].setValue('');
      expect(test1.controls[1].valid).toBe(false);
    });

    it('should nullify all values using config', () => {
      const config: IPosControlConfig = { nullDefault: true };
      const test1 = service.generateTypedFormArray(mockFormGroupObject.firstNames, config);
      expect(test1.controls[1].value).toBeNull();
    });

    it('should disable all controls using config', () => {
      const config: IPosControlConfig = { disabled: true };
      const test1 = service.generateTypedFormArray(mockFormGroupObject.firstNames, config);
      expect(test1.controls[1].disabled).toBeTrue();
    });
  });

  describe('FormGroup:', () => {
    it('Should generate a formGroup', () => {
      const test = service.generateTypedFormGroup<typeof mockFormGroupObject>(mockFormGroupObject);
      expect(test).toBeInstanceOf(FormGroup);
    });

    it('Should generate a formGroup with correct values', () => {
      const test = service.generateTypedFormGroup<typeof mockFormGroupObject>(mockFormGroupObject);
      expect(test.value.lastName).toBe(mockFormGroupObject.lastName);
      expect(test.value.hero).toBe(mockFormGroupObject.hero);
    });
  });
});
