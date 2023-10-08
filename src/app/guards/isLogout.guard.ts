import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../services/users.service";

export const isLogoutGuard = () => {
    const router = inject(Router);
    const usersService = inject(UsersService);

    if(usersService.isLogged()){
        router.navigate(['/tabs/perfil']);
        return false;
    } else {
        return true;
    }
}