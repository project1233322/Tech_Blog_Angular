import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageServiceService } from "../../service/storage-service/storage-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn:'root'
})
export class UserGuard implements CanActivate{

  constructor(private route:Router, private sb : MatSnackBar){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean {
      if(!StorageServiceService.hasToken())
      {
        StorageServiceService.logout();
        this.route.navigate(['']);
        this.sb.open(
          "You're not logged-in, please login first", "Close", {duration:5000}
        )
        return false;
      }
      return true;
    } 
  
}