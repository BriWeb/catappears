import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../users/users.service";

export const isLoginGuard = () => {
    const router = inject(Router);
    const usersService = inject(UsersService);

    if(usersService.isLogged()){
        return true;
    } else {
        router.navigate(['/Login']);
        return false;
    }
}