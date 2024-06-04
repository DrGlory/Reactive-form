import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SearchMovieComponent {
  searchForm: FormGroup;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      movieDetails: this.fb.group({
        identifier: [''],
        title: ['']
      }, { validators: this.isRequiredValidator('identifier', 'title') }),
      type: ['séries'],
      releaseYear: ['', [Validators.required, this.rangeDateValidator(1900, this.currentYear)]],
      fiche: ['']
    });

    // Set default value for 'fiche'
    this.searchForm.patchValue({ fiche: 'courte' });

    // Subscribe to value changes
    this.searchForm.valueChanges.subscribe(value => {
      console.log(value);
    });

    // Enable/disable 'fiche' based on 'identifier'
    this.searchForm.get('movieDetails.identifier')?.valueChanges.subscribe(value => {
      if (value) {
        this.searchForm.get('fiche')?.enable();
      } else {
        this.searchForm.get('fiche')?.disable();
      }
    });
  }

  isRequiredValidator(identifierKey: string, titleKey: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const identifier = formGroup.get(identifierKey)?.value;
      const title = formGroup.get(titleKey)?.value;
      if (!identifier && !title) {
        return { isRequired: true };
      }
      return null;
    };
  }

  rangeDateValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const year = control.value;
      if (year < min || year > max) {
        return { min: { minValue: min, maxValue: max } };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
    } else {
      Object.keys(this.searchForm.controls).forEach(key => {
        const control = this.searchForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
