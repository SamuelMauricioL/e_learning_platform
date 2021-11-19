import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable,of, concat , range} from 'rxjs';
import { AuthService } from '../../infraestructure/driven-adapter/auth/auth.service';
import { GetRolesUseCase } from 'src/app/domain/usecase/get-roles-use-case';
import { GetUserUseCases } from 'src/app/domain/usecase/get-user-use-case';
import { map,take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public user$: Observable<any> = this.auth.afAuth.user;
  public usuario : any;
  public permisosRuta:any;
  public cambio:boolean=true;
  constructor(private auth: AuthService, private router: Router, private seriveRol:GetRolesUseCase,private serviceUser:GetUserUseCases) {
    
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean |  any> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.user$.pipe(
        map(val=>{
          console.log(val);
          if(val!=null){
            const datos:any  = localStorage.getItem('userRoles');
            let jsdatos:any = JSON.parse(datos);
            console.log(jsdatos);
            let permisos = jsdatos.roles.permisosRuta;
            console.log(permisos);
            let existe = permisos.indexOf(route.url[0].path)
            console.log(existe);
            if(existe >= 0){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        })
      )
  }
  
}
