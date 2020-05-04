import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {User} from "../../userModels/user.model";
import {loadUsersList, selectUserErrors, selectUsersList, UserState} from "../../userStore";

@Component({
  selector: 'fis-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit,OnChanges {

  title = 'Danh sách người dùng';

 usersList$: Observable<User[]>;
  errors$: Observable<any>;

  constructor(
      private userStore: Store<UserState>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.onGetProductList();
  }

  ngOnInit(): void {
    this.userStore.dispatch(loadUsersList());

    // Get users from store
    this.usersList$ = this.userStore.pipe(select(selectUsersList));
    this.errors$ = this.userStore.pipe(select(selectUserErrors));
  }



  onSearch(keyword: any) {
    // if(keyword && keyword.length > 0) {
    //   this.productsList$ = this.productService.searchProduct(keyword);
    // } else {
    //   this.onGetProductList();
    // }
    //
  }
}
