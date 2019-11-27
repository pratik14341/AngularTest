import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { ColumnSettings } from '../interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";

@Component({
    templateUrl: '../html/role.html',
   // styleUrls: ['../css/app.css'],
})
export class RoleComponent implements OnInit {
    RoleList: any = [];
    RoleRights: any = [];
    Result: any = {};
    columnsConfig: ColumnSettings[] = [];
    Searchsdisplayname: string = ""
    @ViewChild('RoleEntryform') RoleEntryform: NgForm;
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'User Info';

        this._GlobalFunctionVariables.BindHTMLDropdown("role", {}).subscribe(data => {
            this.RoleList = data;
        });
        this.onLoad();
        this.GetRoleDetail();
    }
    ChangeRole(roleid) {
        this.Result.roleid = roleid;
        this.GetRoleDetail();
    }
    GetRoleDetail() {
        this._GlobalFunctionVariables.Post('/role/list', { roleid: (this.Result && this.Result.roleid && this.Result.roleid != "") ? this.Result.roleid : 0 })
            .subscribe(
                data => {
                    if (data.iserror) {
                        this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                        this.RoleRights = [];
                    } else {
                        // let ResultData = data.data;
                        // if (data.result) {
                        this.RoleRights = data.data;
                        // } else {
                        //     this._GlobalFunctionVariables.ErrorToss("Error to get record, Please try again.")
                        // }
                    }
                },
                error => {
                    this._GlobalFunctionVariables.ErrorToss("Error to get record, Please try again.")
                }
            );
    }
    SaveRoleDetail() {
        if (this._GlobalFunctionVariables.FormValidate(this.RoleEntryform)) {
            console.log(this.RoleRights);
            this._GlobalFunctionVariables.Post('/role/save', { roleid: this.Result.roleid, RoleRights: this.RoleRights })
                .subscribe(
                    data => {
                        if (data.iserror) {
                            this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                        } else {
                            this.GetRoleDetail();
                            this._GlobalFunctionVariables.SuccessToss("Record saved successfully.")
                        }
                    },
                    error => {
                        this._GlobalFunctionVariables.ErrorToss("Error to get record, Please try again.")
                    }
                );
        }
    }
    onLoad = () => {
        this.columnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'id', title: 'Role Id', _width: 50, filter: 'numeric', hidden: true
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'name', title: 'Role Name', _width: 50, // filter: "numeric", format: "{0:c}",
            }),
        ]
    }
    public roleDialogOpened = false;
    callRolepopup() {
        this.roleDialogOpened = true;
    }

    public close() {
        this.roleDialogOpened = false;
    }

    CheckRightsClick(e, userscop){
       // $scope.IsChangeUserRights = true;
        userscop.isupdated = true;
        //all if all select but anyone remove read,write and report then all option remove
        var isallfalse;
        if ($.trim($(e.target).next('label').text()).toLowerCase() === "all") {
            if (userscop.isall) {
                userscop.isreport = true;
                userscop.isdelete = false;
                userscop.iswrite = true;
                userscop.isread = true;
                userscop.isall = true;
            } else //Remove all 3
            {
                userscop.isreport = false;
                userscop.isdelete = false;
                userscop.iswrite = false;
                userscop.isread = false;
                userscop.isall = false;
            }
            isallfalse = true;
            $.each(this.RoleRights, function (key, value) {
                if (value.moduleparentid === userscop.moduleparentid && value.moduleparentid !== value.moduleid) {
                    if (value.isread === true || value.isdelete === true || value.iswrite === true || value.isreport === true || value.isall === true) {
                        isallfalse = false;
                    }
                }
            });
            $.each(this.RoleRights, function (key, value) {
                if (value.moduleid === userscop.moduleparentid) {
                    if (isallfalse) {
                        value.isread = false;
                    } else {
                        value.isread = true;
                    }
                }
            });
        } else {
            userscop.isall = (userscop.isreport && userscop.isread && userscop.iswrite);
            isallfalse = true;
            $.each(this.RoleRights, function (key, value) {
                if (value.moduleparentid === userscop.moduleparentid && value.moduleparentid !== value.moduleid) {
                    if (value.isread === true || value.isdelete === true || value.iswrite === true || value.isreport === true || value.isall === true) {
                        isallfalse = false;
                    }
                }
            });
            $.each(this.RoleRights, function (key, value) {
                if (value.moduleid === userscop.moduleparentid) {
                    if (isallfalse) {
                        value.isread = false;
                    } else {
                        value.isread = true;
                    }
                }
            });

        }
    }

    ExpandCollapse(e) {
        e.preventDefault();
        var $this = e.target;
        if (e.target.tagName.toLowerCase() === "span") {
            $this = e.target.parentElement;
        }
        var curDivId = $("#mainmenu" + $($this).attr('name'));
        if (curDivId.hasClass("collapseall")) {
            //@*Change Icon*@
            $($this).find("span.glyphicon").removeClass("glyphicon-plus");
            $($this).find("span.glyphicon").addClass("glyphicon-minus");
            curDivId.removeClass("collapseall"); curDivId.addClass("expandall");
        }
        else if (curDivId.hasClass("expandall")) {
            //@*Change Icon*@
            $($this).find("span.glyphicon").removeClass("glyphicon-minus");
            $($this).find("span.glyphicon").addClass("glyphicon-plus");
            curDivId.removeClass("expandall"); curDivId.addClass("collapseall");
        }
    }

    ngOnInit() { }
}
