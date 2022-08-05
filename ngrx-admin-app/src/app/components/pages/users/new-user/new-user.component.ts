import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Register } from '../../../../modal/new-user';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/modal/user';
import { Store } from '@ngrx/store';
import { CreateUserSuccess } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewUserComponent implements OnInit {
  register = new Register();

  registerForm: FormGroup;
  validator: any;
  hide: boolean = true;
  timer: any;

  @ViewChild('inputBox') inputBox: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3)]],
        gender: [null, Validators.required],
        company: null,
        emailGroup: this.fb.group(
          {
            email: [null, [Validators.required, Validators.email]],
            confirmEmail: [null, [Validators.required]],
          },
          { validator: this.emailMatcher }
        ),
        age: null,
      },
      { updateOn: 'blur' }
    );
  }

  addUser() {
    const users: any = {
      name: this.registerForm.value.name,
      gender: this.registerForm.value.gender,
      company: this.registerForm.value.company,
      email: this.registerForm.value.email,
      age: this.registerForm.value.age,
    };
    this.store.dispatch(new CreateUserSuccess(users));
    console.log(users);
    this.reset();
  }

  // testData() {
  //   this.registerForm.patchValue({
  //     username: 'Rahul',
  //     gender: 'male',
  //     company: '',
  //     email: 'rahul@gmail.com',
  //     age: '32'
  //   })
  // }

  reset() {
    this.registerForm.reset();
  }

  emailMatcher(ac: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = ac.get('email');
    const confirmControl = ac.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
      return null;
    }
    if (emailControl.value === confirmControl.value) {
      return null;
    }
    return { match: true };
  }

  // keyEvent(ky: AbstractControl): { [key: string]: boolean } | null {
  //   const userControl = ky.get('name');
  //   if (userControl) {
  //     return null;
  //   }
  //   return { match: true };
  // }

  // keyDown() {
  //   // const name = document.getElementById("name");
  //   // name.addEventListener("keydown", function(event) {
  //   //   event.preventDefault();
  //   //   console.log(`${event.type} hasbeen fired`);
  //   // });
  //   // clearTimeout(this.timer());
  //   // this.timer = setTimeout(() => {
  //   //   console.log(val);
  //   // }, 500)
  //   // document.getElementsByClassName('invalid-feedback')
  //   // document.getElementById("myDiv").classList.remove("invalid-feedback");
  //   const btn = document.querySelector('#myDiv');
  //   btn.addEventListener('focus', () => {
  //     alert('Hello World');
  //   });
  // }

  modelChanged(newObj) {
    // do something with new value
    const parent = document.querySelector("#myDiv");
    // const val1 = document.querySelector("#myDiv").querySelector('invalid-feedback').remove;
    const child = document.querySelector('.invalid-feedback');
    const valHidden = document.querySelector("#myDiv").remove;
    // console.log(value);
    // console.log(val1);
    console.log(valHidden);
    // document.getElementById("myDiv").nodeValue;

    // if(value) {

    // }
  }


  //   fireEvent(e) {
  //     this.inputBox.nativeElement.focus();
  //     e.stopPropagation();
  //     e.preventDefault();
  //     console.log('click inside input');
  //     return false;
  // }
}
