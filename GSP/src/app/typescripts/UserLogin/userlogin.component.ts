import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GridBindingDirective } from '../../directive/GridBinding';
import { CustomeGridComponent } from '../../directive/gridComponent';
import { ColumnSettings } from '../../interface';
import { Cookies } from '../../_helpers/cookies';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";

@Component({
    templateUrl: '../../html/UserLogin/userloginList.html',
    //styleUrls: ['../../css/app.css'],
})
export class UserLoginListComponent implements OnInit {
    sendSMSdialogOpened: boolean = false;
    inActivedialogOpened: boolean = false;
    title: string = "";
    message: string = "";
    userid: Number = 0;
    isactive: boolean = true;
    username: string = "";
    displayname: string = "";
    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies, private cdr: ChangeDetectorRef) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'User Info';
        this._GlobalFunctionVariables.gridName = 'userloginList';
        this.onLoad();
        this.onResize();
    }

    @ViewChildren(CustomeGridComponent) gridUserloginList: QueryList<CustomeGridComponent>;
    userloginList: GridBindingDirective;
    gridHeight = 500;

    columnsConfig: ColumnSettings[] = [];
    @HostListener('window:resize', ['$event']) onResize(event?) {
        // console.log(event.target.innerWidth);
        this.gridHeight = window.innerHeight - 110
    }

    Refresh = () => {
        this.userloginList.refresh();
    }

    onLoad = () => {
        this.columnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'userid', title: 'User Id', _width: 50, hidden: true, class: {'centerth': true}, headerClass: {'centertd': true}
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sendsms', title: 'SMS', _width: 50, headerClass: {'centertd': true}, // filter: "numeric", format: "{0:c}",
                isImageButton: true, src:(dataItem) => { return ((dataItem.sendsms == 'Yes') ? '/src/app/images/icons/resend_sms.png' : '/src/app/images/icons/send_sms.png') }, imageTitle:(dataItem) => { return ((dataItem.sendsms == 'Yes') ? 'Resend SMS' : 'Send SMS') }, callBackfunction: this.sendSMS
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'isactive', title: 'Active', _width: 50, // filter: "numeric", format: "{0:c}",
                isImageButton: true,src:(dataItem) => { return ((dataItem.isactive == 'Yes') ? '/src/app/images/icons/user_active.png' : '/src/app/images/icons/user_inactive.png') }, imageTitle:(dataItem) => { return ((dataItem.isactive == 'Yes') ? 'Active User' : 'In Active User') }, callBackfunction: this.userActiveInActive
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'username', title: 'User Name', _width: 50, // filter: "numeric", format: "{0:c}",
                isLinkButton: true, callBackfunction: this.edit
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'password', title: 'Password', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'displayname', title: 'Display Name', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'employeecode', title: 'Employee Code', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'address1', title: 'Address 1', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'address2', title: 'Address 2', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'pincode', title: 'Pin Code', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'email', title: 'email', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'dob', title: 'dob', _width: 50, filter: 'date', format:'{0:dd/MM/yyyy}', class: {'centerth': true}, headerClass: {'centertd': true}
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'salescode', title: 'Sales Code', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'gender', title: 'Gender', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'designation', title: 'Designation', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'usertype', title: 'User Type', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'subusertype', title: 'Sub User Type', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'grade', title: 'Grade', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'headquarter', title: 'Head Quarter', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'vehicle', title: 'Vehicle', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'rolename', title: 'Role Name', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'createddate', title: 'Created Date', _width: 50, filter: 'date', format:'{0:dd/MM/yyyy}', class: {'centerth': true}, headerClass: {'centertd': true}
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'createdby', title: 'Created by', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'modifieddate', title: 'Modified Date', _width: 50, filter: 'date', format:'{0:dd/MM/yyyy}', class: {'centerth': true}, headerClass: {'centertd': true}
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'modifiedby', title: 'Modified by', _width: 50
            }),
        ]
    }

    ngAfterViewInit() {
       
        this.userloginList = this.gridUserloginList.first.objgrid.first;
        let saveObject = this._cookies.GetRemoveCookie('userloginList');
        let userid = this._cookies.GetRemoveCookie('userid');
        if (saveObject) {
            saveObject = JSON.parse(saveObject);
            this.userloginList.setState(JSON.parse(saveObject.state));
            this.cdr.detectChanges();
        }
        if(userid) {
            let selectedid = []
            selectedid.push(parseInt(userid));
            this.userloginList.setSelectedValue(selectedid);
        }
        
        this._GlobalFunctionVariables.gridDirectiveInfo = this.userloginList;
        
        this.columnsConfig = this._GlobalFunctionVariables.LoadGridColumns(this._GlobalFunctionVariables.gridName, this.columnsConfig) || this.columnsConfig;
        this.userloginList.rebind();
    }

    New = () => {
        this.router.navigate(['/userlogin/userentry']);
    }

    edit = (dataItem, e) => {
        debugger;
        this._cookies.SetState('userloginList', this.userloginList.getState());
        this._cookies.SetCookie('userid', dataItem.userid);
        this.router.navigate(['/userlogin/userentry']);
    }

    sendSMS = (dataItem, e) => {
        this.userid = dataItem.userid;
        this.username = dataItem.username;
        this.displayname = dataItem.displayname;
        this.sendSMSdialogOpened = true;
        this.title = "GSP";
        if(dataItem.sendsms == 'Yes')
        {
            this.message = "Are you sure,do you want to re-send welcome message?";
        } else {
            this.message = "Are you sure,do you want to send welcome message?";
        }   
    }

    userActiveInActive = (dataItem, e) => {
        this.userid = dataItem.userid;
        this.inActivedialogOpened = true;
        this.title = "GSP";
        if(dataItem.isactive == 'Yes')
        {
            this.isactive = true;
            this.message = "Are you sure,do you want to In-Active this user?";
        }else {
            this.isactive = false;
            this.message = "Are you sure,do you want to Active this user?";
        }
    }

    confirmSendSMS(issend) {
        if(issend){
            this._GlobalFunctionVariables.Post('/userlogin/resendsms', { userid: this.userid, username: this.username, displayname: this.displayname })
                .subscribe(
                    data => {
                        if (data.iserror) {
                            this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                        } else {
                            this._GlobalFunctionVariables.SuccessToss("Send SMS successfully.")
                            this.Refresh();
                            this.sendSMSdialogOpened = false;
                        }
                    },
                    error => {
                        this._GlobalFunctionVariables.ErrorToss("Error to Send SMS, Please try again.")
                    }
                );
        } else {
            this.sendSMSdialogOpened = false;
        }
    }
    confirmUserActiveInActive(issend) {
        if(issend){
            this._GlobalFunctionVariables.Post('/userlogin/useractiveinactive', { userid: this.userid, isactive: this.isactive })
            .subscribe(
                data => {
                    if (data.iserror) {
                        this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                    } else {
                        this._GlobalFunctionVariables.SuccessToss("User In-Active successfully.")
                        this.Refresh();
                        this.inActivedialogOpened = false;
                    }
                },
                error => {
                    this._GlobalFunctionVariables.ErrorToss("Error to save record, Please try again.")
                }
            );
        } else {
            this.inActivedialogOpened = false;
        }
    }

    SaveasExcel = () => {
        this.userloginList.saveAsExcel()
    }
    ngOnInit() { this.gridHeight = window.innerHeight - 110 }
}

@Component({
    templateUrl: '../../html/UserLogin/UserLoginEntry.html',
   // styleUrls: ['../../css/app.css']
})
export class UserLoginEntryComponent implements OnInit {
    isPreview: boolean;
    Result: any = {
        username:'',
        displayname:'',
        employeecode:'',
        address1:'',
        address2:'',
        pincode:'',
        genderid:'',
        designation:'',
        usertypeid:'',
        subusertypeid:'',
        email:'',
        dob:null,
        salescode:'',
        gradeid:'',
        headquarterid:'',
        vehicleid:'',
        roleid:''
    };
    isError: boolean = false;
    ErrorMessage: string = "";
    userid: number = 0;
    Heading: string = "User Management > Users";
    UserType: any = [];
    SubUserTypeList: any = [];
    GradeList: any = [];
    VehicleList: any = [];
    HeadQuarterList: any = [];
    GenderList: any = [];
    UserTypeName: string = ""
    RoleList: any = [];
    GradeNAId: number = 0;
    VehicleNAId: number = 0;
    @ViewChild('UserLoginEntryform') UserLoginEntryform: NgForm;

    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies, private cdr: ChangeDetectorRef) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'User Info';

        this.userid = this._cookies.GetRemoveCookie('userid');
        if (this.userid == 0 || this.userid == null) {
            this.isPreview = false;
            this.Heading += ' > New'
        } else {
            this.GetUserDetail()
            this.isPreview = true;
        }

        this.BindDroupdown()
    }

    BindDroupdown() {
        this._GlobalFunctionVariables.BindHTMLDropdown("lookup",{'lookupname':"Gender"}).subscribe(data => {
            this.GenderList = data;
        });

        this._GlobalFunctionVariables.BindHTMLDropdown("lookup",{'lookupname':"User Type"}).subscribe(data => {
            this.UserType = data;
        });

        this._GlobalFunctionVariables.BindHTMLDropdown("lookup",{'lookupname':"Grade"}).subscribe(data => {
            this.GradeList = data;
            data.forEach(value => {
                if(value.t == 'N/A')
                {
                    this.GradeNAId = value.v;
                }
              });
        });

        this._GlobalFunctionVariables.BindHTMLDropdown("lookup",{'lookupname':"Vehicle"}).subscribe(data => {
            this.VehicleList = data;
            data.forEach(value => {
                if(value.t == 'N/A')
                {
                    this.VehicleNAId = value.v;
                }
              });
        });

        this._GlobalFunctionVariables.BindHTMLDropdown("headquarter",{}).subscribe(data => {
            this.HeadQuarterList = data;
        });

        this._GlobalFunctionVariables.BindHTMLDropdown("role",{'tablename':"tblrole",'value':'roleid','text':'rolename',where:'',orderby:''}).subscribe(data => {
            this.RoleList = data;
        });
    }

    GetSubUserTypeList(usertypeid) {
        if(usertypeid != null)
        {
            this._GlobalFunctionVariables.BindHTMLDropdown("subusertype",{usertypeid: usertypeid}).subscribe(data => {
                this.SubUserTypeList = data;
            });
        }
    }

    columnsConfig: ColumnSettings[] = [];
    @HostListener('window:resize', ['$event']) onResize(event?) {
        // console.log(event.target.innerWidth);

    }

    onUserNameBlur() {
        this.isError = false;
        this.ErrorMessage = "";
    }
    
    ChangeUserType(usertypeid) {
        
        this.UserType.forEach(value => {
            if(value.v == usertypeid)
            {
                this.UserTypeName = value.t;
                if(value.t !== 'Sales' && value.t !== 'Marketing')
                {
                    this.Result.gradeid = this.GradeNAId;
                    this.Result.vehicleid = this.VehicleNAId;
                }
            }
          });
          
        this.GetSubUserTypeList(usertypeid);
    }

    List(){
        this._cookies.SetCookie('userid', this.userid);
        this.router.navigate(['/userlogin']);
    }

    Edit() {
        this.isPreview = false;
    }

    onTabSelect(event){

    }

    GetUserDetail() {
        this._GlobalFunctionVariables.Post('/userlogin/getdata', { userid: this.userid })
        .subscribe(
            data => {
                if (data.iserror) {
                    this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                } else {
                    this.Result = data.data;
                    this.UserTypeName = this.Result.usertype
                    this.Result.dob = (data.data.dob) ? new Date(data.data.dob) : null ;
                    this.GetSubUserTypeList(this.Result.usertypeid)
                    this.Heading += ' > Edit - '+ this.Result.username;
                }
            },
            error => {
                this._GlobalFunctionVariables.ErrorToss("Error to saving record, Please try again.")
            }
        );
    }

    CheckExistsValidation() {
        let para = []
        para.push(this.Result);
        this._GlobalFunctionVariables.WithoutLoadingPost('/userlogin/checkexistsvalidation', { userid:(this.Result.userid > 0) ? this.Result.userid :0,userentry: para })
        .subscribe(
            data => {
                if (data.iserror) {
                    this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                } else {
                    if (data.data.isexists) {
                        if(data.data.key == 'Username')
                        {
                            this.UserLoginEntryform.form.controls['username'].setErrors({'inExists': true});
                        } 
                        if(data.data.key == 'Email')
                        {
                            this.UserLoginEntryform.form.controls['email'].setErrors({'inExists': true});
                        } 
                        if(data.data.key == 'Employeecode')
                        {
                            this.UserLoginEntryform.form.controls['employeecode'].setErrors({'inExists': true});
                        } 
                    }
                }
            },
            error => {
                this._GlobalFunctionVariables.ErrorToss("Error to save record, Please try again.")
            }
        );
    }

    Save() {
        if (this._GlobalFunctionVariables.FormValidate(this.UserLoginEntryform)) {
            let para = []
            this.Result.dob = (this.Result.dob == "") ? null : this.Result.dob;
            para.push(this.Result);
            this._GlobalFunctionVariables.Post('/userlogin/entry', { userid:(this.Result.userid > 0) ? this.Result.userid :0,userentry: para })
                .subscribe(
                    data => {
                        if (data.iserror) {
                            this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                        } else {
                            let ResultData = data.data;
                            if (ResultData.isexists) {
                                this.isError = true;
                                this.ErrorMessage = "User id alreay exists";
                            } else {
                                this.isError = false;
                                this.ErrorMessage = "";
                                this._GlobalFunctionVariables.SuccessToss("Record saved successfully.")
                                this.List();
                            }
                        }
                    },
                    error => {
                        this._GlobalFunctionVariables.ErrorToss("Error to saving record, Please try again.")
                    }
                );
        }
    }



    ngAfterViewInit() {
    }

    ngOnInit() {
        //this.GetUserDetail();
    }
  
}