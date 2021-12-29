import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  currentProfile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService:StoreService,
    private authService: AuthService,
    private categoriesService:CategoriesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data =>{
      this.currentProfile = data;
    }
    )
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

  login(){
    this.authService.loginAndGet('tomas@tomas.com','12456')
    .subscribe(() =>{
      //cuando regresa un token aqui se puede guardar o procesar
      this.router.navigate(['/profile']);
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

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data
    })
  }

  logout(){
    this.authService.logOut();
    this.currentProfile = null;
    this.router.navigate(['/home']);
  }
}
