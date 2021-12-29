import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users/users.service';

import { FilesService } from './services/files/files.service';
import { TokenService } from './services/token/token.service';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  currentProfile = {};
  imgRta = '';

  constructor(
    private userService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService,
    private authService: AuthService
  ){}

  ngOnInit(){
   const token = this.tokenService.getToken();
   if(token){
    this.authService.getProfile()
    .subscribe()
   }
  }

  createUser(){
    this.userService.create({
      name: 'Tomas',
      email: 'tomas@tomas.com',
      password: '12456',
      role:'admin'
    })
    .subscribe(rta =>{
      console.log(rta)
    });
  }

  downLoadPDF(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'applications/pdf')
    .subscribe(
    )
  }

  onUpload(event:Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.upLoadFile(file)
      .subscribe(rta=>{
        this.imgRta = rta.location
      });
    }
  }
}
