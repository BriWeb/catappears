import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../services/users.service";

export const isLoginGuard = () => {
    const router = inject(Router);
    const usersService = inject(UsersService);

    if(usersService.isLogged()){
        return true;
    } else {
        router.navigate(['/tabs/login']);
        return false;
    }
}