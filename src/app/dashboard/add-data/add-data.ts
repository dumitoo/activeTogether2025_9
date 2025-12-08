import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '../../shared/store';
import { Backend } from '../../shared/backend';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelect, MatOption }     from '@angular/material/select';
import { MatCheckbox }   from '@angular/material/checkbox';
import { MatDatepickerModule, MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAnchor }     from '@angular/material/button';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule, MatSelect, MatOption, MatCheckbox, MatAnchor],
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss',
})
export class AddData {
  public store = inject(Store);
  public backend = inject(Backend);
  private fb = inject(FormBuilder);
  public signupForm: any;

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletter: [false],
      email: [{ value: '', disabled: true}, [Validators.email]]
    });

    this.signupForm.get('newsletter')?.valueChanges.subscribe((isChecked: boolean) => {
      const emailControl = this.signupForm.get('email');
      if (isChecked) {
        emailControl?.enable();
      } else {
        emailControl?.disable();
        emailControl?.reset();
      }
    })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.backend.addRegistration(this.signupForm.value);
    }
  }
}
