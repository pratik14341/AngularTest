import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";
import { Cookies } from '../../_helpers/cookies';

@Component({
    selector: 'Forgot',
    templateUrl: '../../html/login/Forget/forget.html',
    //styleUrls: ['../../css/login.css'],

})
export class ForgotComponent implements OnInit {
    title: string = 'Recover your Password';
    //isForgotPassword: boolean = true;
    ErrorMessage: string = "";
    isError: boolean = false;
    isErrorForMobile: boolean = false;
    isErrorForOTP: boolean = false;
    @ViewChild('ForgotUserform') ForgotUserform: NgForm;
    @ViewChild('ForgotOTPform') ForgotOTPform: NgForm;
    @ViewChild('ForgotPasswordform') ForgotPasswordform: NgForm;
    _subscription;
    register: any = {};
    loading: boolean = false;

    IsShowUsername: boolean = true;
    IsShowOTP: boolean = false;
    IsShowPassword: boolean = false;
   
    constructor( public _GlobalFunctionVariables: GlobalFunctionVariables,
         private router: Router,private _cookies: Cookies) {
           this.title = 'Generate Password';
    }
    ngOnInit() {
    }

    onNextMobile() {
        if (this._GlobalFunctionVariables.FormValidate(this.ForgotUserform)) {
            this._GlobalFunctionVariables.Post('/forgotSendOTP', { username: this.register.username})
            .subscribe(
                data => { 
                    if(data.iserror)
                    {
                        this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                    } else{
                        let ResultData = data.data;
                        if (ResultData.iserror) {
                            this.isError = true;
                            this.ErrorMessage = ResultData.errormessage;//(this.isForgotPassword) ? "Mobile number not registered or password not generated" : "Mobile number not registered or password already generated";
                        } else {
                            this.isError = false;
                            this.ErrorMessage = "";
                            this.register.userid = ResultData.userid;
                            this.IsShowUsername = false;
                            this.IsShowOTP = true;
                            this.IsShowPassword = false;
                        }
                    }
                },
                error => {
                    this.loading = false;
                }
            );
        }
    }

    onBackMobile() {
        this.register.OTP="";
        this.isError = false;
        this.ErrorMessage = "";
        this.IsShowUsername = true;
        this.IsShowOTP = false;
        this.IsShowPassword = false;
    }

    onNextOTP() {
        this.loading = true;
        if (this._GlobalFunctionVariables.FormValidate(this.ForgotOTPform)) {
            this._GlobalFunctionVariables.Post('/forgotCheckOTP', { username: this.register.username, userid: this.register.userid, otp: this.register.OTP })
            .subscribe(
                data => {
                    this.loading = false;
                    if(data.iserror)
                    {
                        this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                    } else{
                        let ResultData = data.data;
                        if (ResultData.iserror) {
                            this.isError = true;
                            this.ErrorMessage = ResultData.errormessage;
                        } else {
                            this.isError = false;
                            this.ErrorMessage = "";
                            this.IsShowUsername = false;
                            this.IsShowOTP = false;
                            this.IsShowPassword = true;
                        }
                    }
                },
                error => {
                    this.loading = false;
                }
            );            
        }
    }

    onBackOTP() {
        this.register.newpassword = "";
        this.register.confirmationpassword = "";
        this.isError = false;
        this.ErrorMessage = "";
        this.IsShowUsername = false;
        this.IsShowOTP = true;
        this.IsShowPassword = false;
        
    }

    onClick() {
        this.loading = true;
        if (this._GlobalFunctionVariables.FormValidate(this.ForgotPasswordform)) {
            this._GlobalFunctionVariables.Post('/forgotChangePassword', { username: this.register.username, userid: this.register.userid, otp: this.register.OTP, password: this.register.newpassword })
            .subscribe(
                data => {
                    this.loading = false;
                    if(data.iserror)
                    {
                        this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                    } else{
                        let ResultData = data.data;
                        if (ResultData.iserror) {
                            this.isError = true;
                            this.ErrorMessage = ResultData.errormessage;
                        } else {
                            this.isError = false;
                            this.ErrorMessage = "";
                            this.router.navigate(['/']);
                        }
                     }
                },
                error => {
                    this.loading = false;
                }
            );         
        }
    }
}
