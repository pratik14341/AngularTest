import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { GridBindingDirective } from '../directive/GridBinding';
import { CustomeGridComponent } from '../directive/gridComponent';
import { ColumnSettings } from '../interface';
import { Cookies } from '../_helpers/cookies';
import { GlobalFunctionVariables } from "../_helpers/GlobalFunctionVariables";

@Component({
    templateUrl: '../html/subregionlist.html'
})
export class subregionListComponent implements OnInit {

    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies, private cdr: ChangeDetectorRef) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'Sub Region';
        this.onLoad();
        this.onResize();
    }
//Left Detail Menu Name subregion
//LEft Master Menu Name Master

    @ViewChildren(CustomeGridComponent) gridsubregionList: QueryList<CustomeGridComponent>;
    subregionList: GridBindingDirective;
    gridHeight = 500;

    columnsConfig: ColumnSettings[] = [];
    @HostListener('window:resize', ['$event']) onResize(event?) {
        // console.log(event.target.innerWidth);
        this.gridHeight = window.innerHeight - 64
    }
    onLoad = () => {
        this.columnsConfig =  [ 
this._GlobalFunctionVariables.AddgridColumns({ field: 'id',title: 'id', _width: 40 , filter: "numeric", format: "{0:c}",class : "centerth,centertd",isLinkButton: true, callBackfunction: this.edit }),
this._GlobalFunctionVariables.AddgridColumns({ field: 'subregion',title: 'subregion', _width: 40} ),
this._GlobalFunctionVariables.AddgridColumns({ field: 'name',title: 'name', _width: 40 }) ]	
    }

    ngAfterViewInit() {
        this.subregionList = this.gridsubregionList.first.objgrid.first;
        let saveObject = this._cookies.GetRemoveCookie('subregionList');
        if (saveObject) {
            saveObject = JSON.parse(saveObject);
            this.subregionList.setState(JSON.parse(saveObject.state));
            this.cdr.detectChanges();
        }
        this.subregionList.rebind();
        this._GlobalFunctionVariables.gridDirectiveInfo = this.subregionList;
        this._GlobalFunctionVariables.gridName = 'subregionList'

    }

    edit = (dataItem, e) => {
        debugger;
        this._cookies.SetState('subregionList', this.subregionList.getState());
        this._cookies.SetCookie('id', dataItem.id);
        this.router.navigate(['/subregion/entry']);
    }
    SaveasExcel = () => {
        this.subregionList.saveAsExcel()
    }
    ngOnInit() { }
}
