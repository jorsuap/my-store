import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

user: User  | null = null;

 constructor(
   private authService:AuthService
 ){}

  ngOnInit(){
  this.authService.user$
  .subscribe(data =>{
      this.user = data;
    })
  }
}
