import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../userModels/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {createUser, loadUser, selectUser, updateUser, UserState} from "../../userStore";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'fis-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit,OnDestroy{
  submitted = false;
  title = 'Chi tiết người dùng';

  private unsubcribe$ = new Subject<void>();
  user$: Observable<User>;

  checkExist: boolean;

  userForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl(''),
    age: new FormControl(0),
    phone: new FormControl(''),
    address: new FormControl('')

  });

  constructor(
      private route:ActivatedRoute,
      private router: Router,
      private userStore: Store<UserState>,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    const id: any = this.route.snapshot.paramMap.get('userId');
    if(id) {
      this.checkExist = true;
      this.userStore.dispatch(loadUser({id: id}));
      this.user$ = this.userStore.pipe(select(selectUser));

      this.user$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if(res) {
          this.userForm.patchValue(res);
        }
      });

      // this.productService.getProductById(Number(id)).subscribe(res => {
      //   if(res) {
      //     this.productFrom.patchValue(res);
      //   }
      // });
    } else {
      this.checkExist = false;
    }
  }
  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value, null, 4));
  }
  onSave(form: FormGroup) {
    this.onSubmit();
    if(this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }
  }
  get f() { return this.userForm.controls; }
  onCreate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch(createUser({user: value}));


    // let result = this.productService.addNewProduct(value);
    // if(result) {
    //   console.log('them moi thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
    // }
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch(updateUser({user: value}));

    // let result = this.productService.updateProduct(value);
    // if(result) {
    //   console.log('update thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
    // }
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
