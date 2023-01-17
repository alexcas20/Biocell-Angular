import { Component, OnInit } from '@angular/core';
import { loginService } from '../../services/login.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiService) { }




  user: any = ""

  


  ngOnInit(): void {

    

    this.user = localStorage.getItem("user");
   

  
  }

 

}
