import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../helpers/users/users.service';

@Component({
  selector: 'RouterPage',
  templateUrl: 'router.page.html',
  styleUrls: ['router.page.scss']
})
export class RouterPage {

  constructor(private router: Router) {}

  usersService = inject(UsersService);

}
