import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreaUsertDTO, User } from 'src/app/models/user.model';
import { Auth } from 'src/app/models/auth.model';
import { BehaviorSubject, switchMap, tap} from 'rxjs';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User|null>(null)//se usa el metodo Behaiviorsubjec para implementar el patron observable
  user$ = this.user.asObservable(); //observable

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

  getProfile(){
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user))
    );
  }
  loginAndGet(email:string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }

  logOut(){
    this.tokenService.removeToken();
  }
}
