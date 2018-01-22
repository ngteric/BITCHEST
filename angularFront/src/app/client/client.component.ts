import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {NavigationEnd, Router} from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  users: any [];
  currencies: any [];
  userAuth:any[];
  userId: any;
  successPost : Boolean;
  userSelected: {
  };
  
  saveResponse: any;
  showList:boolean = true;
  
    constructor(private userService: UsersService,
                private route: Router,
                ) {
      // override the route reuse strategy
      this.route.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      }
  
      this.route.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.route.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
        }
      });
  
    }
  
    ngOnInit() {
      this.userId = localStorage.getItem('id');
  
      this.userService.getUser(this.userId)
        .subscribe(userAuth => this.userAuth = userAuth);
  
      this.userService.getUsers()
        .subscribe(users => this.users = users);
  
      this.userService.getCurrencies()
        .subscribe( currencies => this.currencies = currencies);
    }
  
    getUserInfo(id){
      this.userService.getUser(id)
        .subscribe(user =>{
          this.userSelected = user;
    });
    }
  
    save(user, id){
      console.log(user)
    //console.log(this.userSelected)
      this.userService.saveUser(user, id)
        .subscribe( saveResponse => this.saveResponse = saveResponse);
     this.route.navigate(['/admin']);
    }

    updateUser(credentials){
      this.userService.saveUser(credentials, this.userSelected)
      .subscribe((response: Response) => {
        let res:any = response;
        if(res.success){
          this.successPost = true;
        }
      });
    }
  
    delete(id) {
      //TODO
    }

}