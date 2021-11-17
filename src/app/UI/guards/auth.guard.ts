import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../infraestructure/driven-adapter/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public user$: Observable<any> = this.auth.afAuth.user;
  public usuario : any;
  public permisosRuta:any;
  constructor(private auth: AuthService, private router: Router) {
    this.user$.subscribe((result)=>{
      this.usuario = result;
    })
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.user$);
      
      if(this.usuario!=null){
        return true;
      }else{
        this.router.navigate(['/home']);
        return false
      }
    
    
  }
  
}
