import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageServiceService } from "../../service/storage-service/storage-service.service";


@Injectable({
  providedIn:'root'
})
export class NoAuthGuard implements CanActivate{

  constructor(private route:Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean {
      if(StorageServiceService.hasToken())
      {
        this.route.navigate(['/user/dashboard']);
        return false;
      }
      return true;
    } 
  
}