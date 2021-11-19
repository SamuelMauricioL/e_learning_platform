import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../infraestructure/driven-adapter/auth/auth.service';
import {GetRolesUseCase} from '../../../domain/usecase/get-roles-use-case';
import { GetUserUseCases } from 'src/app/domain/usecase/get-user-use-case';
@Component({ 
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  public user$: Observable<any> = this.auth.afAuth.user;
  constructor(private auth: AuthService, private router: Router, 
    private seriveRol : GetRolesUseCase,private serviceUser:GetUserUseCases) {
    this.getRol();
   }

  isStudent: boolean = false;
  public menus:any[] = [];
  async onLogout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  changeProfile() {
    this.isStudent = !this.isStudent;
    // console.log(this.isStudent);
  }

  getRol(){
    this.user$.subscribe((result)=>{
      // console.log(result);
      // console.log(result.email);
      this.serviceUser.getUsersByEmail(result.email).subscribe((result)=>{
        
        if(result!=null){
          // console.log(result);
          let usuario:any = result[0];
          this.seriveRol.getOneRol(usuario.rol).subscribe((result)=>{
            console.log(result);
            if(result!=null){
              let menuResult = result[0].menu;
              this.menus = menuResult;
            }
            
          })
          
        }
        
      })
      
    
    })
  }

}
