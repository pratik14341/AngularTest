import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";
@Component({
    selector: "home-root",
    templateUrl: '../html/home.html',
    styleUrls: ['../css/app.css'],
    // styleUrls: ['../css/main.css','../css/card.css']
})

export class HomeComponent implements OnInit {
    url: string = "";
    public onPanelChange(event: any) { console.log("stateChange: ", event); }
    showMenu: boolean = false;
    showIcon: boolean = false;
    displayName: string = '';
    hiddenClass: string = ''
    ISleftMenuShowHide: boolean = true;
    constructor(public _GlobalFunctionVariables: GlobalFunctionVariables,private router: Router) {
       
        this.displayName = localStorage.getItem('displayname');
        this.url=this.router.url;
        let flag = false;
        for(let i=0;i< _GlobalFunctionVariables.userLeftMenu.length;i++){
            _GlobalFunctionVariables.userLeftMenu[i].items = _GlobalFunctionVariables.userLeftMenu[i].c;
            delete _GlobalFunctionVariables.userLeftMenu[i].c;
            for(let j=0;j<_GlobalFunctionVariables.userLeftMenu[i].items.length;j++){
                if(_GlobalFunctionVariables.userLeftMenu[i].items[j].ul.includes(this.router.url))
                {
                    flag = true;
                    break;
                }
            }
            if(flag)
            {
                _GlobalFunctionVariables.userLeftMenu[i].expanded = true;
                flag = false
               // break;
            }
        }
    }
      
    Menuclick() {
        if(this.hiddenClass == "")
        {
            this.ISleftMenuShowHide = false;
            this.hiddenClass= "sidebar_coll";
        } else {
            this.ISleftMenuShowHide = true;
            this.hiddenClass= "";
        }
    }

    public onSelect(item): void {
        if (!item.items) {
            this.router.navigate([ item.u ]);
        }
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    onLogout() {
        console.log('onLogout');
        this._GlobalFunctionVariables.logout();
    }
}