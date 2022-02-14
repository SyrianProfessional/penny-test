import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { IUserState } from '../../store/app-state';
import { IUser } from './../../../../../api/src/app/user/interfaces/user.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsers } from '../../store/users/user.selector';
import { updateUsersInStore } from '../../store/users/user.actions';

@Component({
  selector: 'penny-test-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  loading = true;
  pageSize = 10;
  page = 1;
  total = 0;
  searchWord = '';

  users$!: Observable<IUser[]>;

  constructor(
    private userService: UsersService,
    private store: Store<IUserState>
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.users$ = this.store.pipe(select(selectUsers));
  }

  getAllUsers() {
    this.loading = true;
    this.userService
      .getAllUsers({
        pageSize: this.pageSize,
        page: this.page,
        searchWord: this.searchWord,
      })
      .subscribe((res) => {
        this.loading = false;
        this.total = res.data.paging.total;
        this.users = res.data.data;
        this.store.dispatch(updateUsersInStore(this.users));
      });
  }

  changePage(page: number) {
    this.page = page;
    this.getAllUsers();
  }
  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;

    this.getAllUsers();
  }

  search() {
    this.page = 1;

    this.getAllUsers();
  }
}
