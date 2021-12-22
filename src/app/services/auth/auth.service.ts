import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreaUsertDTO, User } from 'src/app/models/user.model';
import { Auth } from 'src/app/models/auth.model';
import { switchMap, tap} from 'rxjs';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email, password})
    .pipe(
      tap(respose => this.tokenService.saveToken(respose.access_token))
    )
  }

  profile(){
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`,{
      // headers:{
      //   Authorization: `Bearer ${token}`//debe tener un espacio
      // }
    })
  }
  loginAndGet(email:string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(() => this.profile())
    )
  }
}
