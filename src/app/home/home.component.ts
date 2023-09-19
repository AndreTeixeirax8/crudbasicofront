import { Component,OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  userName?: string;

  constructor(
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    const userName = this.tokenService.getUserName();
    if (userName !== null) {
      this.userName = userName;
    }
  }

}
