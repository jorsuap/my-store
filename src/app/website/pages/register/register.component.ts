import { Component } from '@angular/core';
import { ExitGuard, OnExit } from 'src/app/guards/exit.guard';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit{

  constructor(){}

  onExit(){
    const rta = confirm('Esta seguro que desea salir?');
    return rta;
  }
}
