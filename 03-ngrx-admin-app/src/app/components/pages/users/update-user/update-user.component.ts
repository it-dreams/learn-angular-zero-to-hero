import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Register } from 'src/app/modal/new-user';
import { IUser } from 'src/app/modal/user';
import { Store, select } from '@ngrx/store';
import { UpdateUserSuccess } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Register
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(
        this.data ? this.data.name : null, [Validators.required]
      ),
      gender: new FormControl(this.data ? this.data.gender : null, [Validators.required]),
      emailGroup: this.fb.group({
        email: new FormControl(this.data ? this.data.email : null, [
          Validators.required,
          Validators.email,
        ]),
        confirmEmail: new FormControl(
          this.data ? this.data.email : null,
          [Validators.required]
        ),
      }),
      company: new FormControl(this.data ? this.data.company : null, [Validators.required]),
      age: new FormControl(this.data ? this.data.age : null, [Validators.required]),
    });
  }

  updateUser() {
    const users = { 
      id: this.data.id,
      ...this.userForm.value 
    };
    this.store.dispatch(new UpdateUserSuccess(users));
    this.dialogRef.close();
  }

  // reset form
  Reset() {
    this.userForm.reset();
  }
}
