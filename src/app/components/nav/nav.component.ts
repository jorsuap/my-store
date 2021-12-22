import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user.model';
import { switchMap} from 'rxjs/operators';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  currentProfile: User | null = null;

  constructor(
    private storeService:StoreService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

  login(){
    this.authService.loginAndGet('Nicolas@Nicolas.com','12456')
    .subscribe(user =>{
      //cuando regresa un token aqui se puede guardar o procesar
      this.currentProfile = user;
    })

  }

  // getProfile(){
  //   this.authService.profile()
  //   .subscribe(profile=>{
  //     console.log(profile)
  //     this.currentProfile = profile;
  //   })
  // }
  // loginAndGet(email:string, password:string){
  //   return this.login(email, password)
  //   .pipe(
  //     switchMap(()=> this.getProfile())
  //   )
  // }
}
