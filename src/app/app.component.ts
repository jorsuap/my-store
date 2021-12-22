import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { FilesService } from './services/files/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentProfile = {};
  imgRta = '';

  constructor(
    private authService :AuthService,
    private userService: UsersService,
    private filesService:FilesService
  ){}

  createUser(){
    this.userService.create({
      name: 'Nicolas',
      email: 'Nicolas@Nicolas.com',
      password: '12456'
    })
    .subscribe(rta =>{
      console.log(rta)
    });
  }

  downLoadPDF(){
    this.filesService.getFile('my.pdf', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'applications/pdf')
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
