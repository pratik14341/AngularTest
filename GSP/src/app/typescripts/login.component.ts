import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
import { Cookies } from '../_helpers/cookies';

@Component({
    templateUrl: '../html/login/login.html',
    styleUrls: ['../css/login.css'],
})
export class LoginComponent implements OnInit {
    title = 'GSP';
   // isError: boolean = false;

    // @ViewChild('loginform')
    // public loginform: NgForm;
    _subscription;
    register: any = {};
    loading: boolean = false;
    isExistingUserLogin: boolean = true;
    constructor( public _GlobalFunctionVariables: GlobalFunctionVariables,
         private router: Router,private _cookies: Cookies) {
       // this._GlobalFunctionVariables.isLoading=true;   
     }
    ngOnInit() {
    }

    onClick() {
        // if (this._GlobalFunctionVariables.FormValidate(this.loginform)) {
        //     this._GlobalFunctionVariables.Post('/userlogin', { username: this.register.username, password: this.register.password })
        //         .subscribe(
        //             data => {
        //                 if (data.userid == -1) {
        //                     this.isError = true;
        //                 } else {
        //                     localStorage.setItem('token', data.token);
        //                     localStorage.setItem('userid', data.userid);
        //                     this._GlobalFunctionVariables.userRights = JSON.parse(data.userRights);
        //                     this._GlobalFunctionVariables.userLeftMenu = data.userleftMenu;
                            
        //                     this._cookies.SetCookie("gridSaveLayout",data.gridcolumns.d);
        //                     localStorage.setItem('utoken', data.utoken);
        //                     localStorage.setItem('displayname', data.displayname);
        //                     this.router.navigate(['/']);
        //                 }
        //             },
        //             error => {

        //             }
        //         );
        // }
    }
}