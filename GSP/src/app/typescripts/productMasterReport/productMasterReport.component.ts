import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GridBindingDirective } from '../../directive/GridBinding';
import { CustomeGridComponent } from '../../directive/gridComponent';
import { ColumnSettings } from '../../interface';
import { Cookies } from '../../_helpers/cookies';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";

@Component({
    templateUrl: '../../html/productMasterReport/productMasterReport.html',
    //styleUrls: ['../../css/app.css'],
})
export class productMasterReportComponent implements OnInit {
    title: string = "";
    message: string = "";
    userid: Number = 0;
    isactive: boolean = true;
    username: string = ""
    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies, private cdr: ChangeDetectorRef) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'Customer Master';
        this._GlobalFunctionVariables.gridName = 'CustomerList';
        this.onLoad();
        this.onResize();
    }

    @ViewChildren(CustomeGridComponent) gridCustomerList: QueryList<CustomeGridComponent>;
    CustomerList: GridBindingDirective;
    gridHeight = 500;

    columnsConfig: ColumnSettings[] = [];
    @HostListener('window:resize', ['$event']) onResize(event?) {
        // console.log(event.target.innerWidth);
        this.gridHeight = window.innerHeight - 110
    }

    Refresh = () => {
        this.CustomerList.refresh();
    }

    onLoad = () => {
        this.columnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'id', title: 'Customer Id', _width: 50, hidden: true,filter: 'numeric'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sendsms', title: '', _width: 50, filterable: false, locked: true,
                isImageButton: true, src:(dataItem) => { return '/src/app/images/icons/print_icon.png' }, imageTitle:(dataItem) => { return 'Ledger Report' }, callBackfunction: this.LedgerReport
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'cc', title: 'Customer Code', _width: 50, class: {'centerth': true}, headerClass: {'centertd': true}, // filter: "numeric", format: "{0:c}",
                isLinkButton: true, callBackfunction: this.edit, locked: true
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ib', title: 'isblock', _width: 50,class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'br', title: 'Block Reason', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'cn', title: 'Customer Name', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'c', title: 'City', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'mn', title: 'Mobile No.', _width: 50,class: {'centerth': true}, headerClass: {'centertd': true}
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ccat', title: 'Customer Catagory', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ct', title: 'Customer Type', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ccd', title: 'Created Date', _width: 50, filter: 'date', format: '{0:dd/MM/yyyy}',class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'cat', title: 'Category', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ad', title: 'Address', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ic', title: 'IsCrop', _width: 50,class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'crop', title: 'Crop', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sales', title: 'Sales', _width: 50, filter: 'numeric', format: "{0:c}",class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sr', title: 'Sales Return', _width: 50, filter: 'numeric', format: "{0:c}",class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'cl', title: 'Credit Limit', _width: 50, filter: 'numeric', format: "{0:c}",class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'col', title: 'Collection', _width: 50, filter: 'numeric', format: "{0:c}",class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'out', title: 'Outstanding', _width: 50, filter: 'numeric', format: "{0:c}",class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'averd', title: 'DSO', _width: 50, filter: 'numeric',class: {'centerth': true}, headerClass: {'centertd': true},
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'ter', title: 'territory', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'reg', title: 'region', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'st', title: 'state', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'zo', title: 'zone', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'gmnm', title: 'GM', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'zmnm', title: 'ZM', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'rsnm', title: 'RS', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'amnm', title: 'AM', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'tmnm', title: 'TM', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'senm', title: 'SE', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sonm', title: 'SO', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'srnm', title: 'SR', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'sdonm', title: 'SDO', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'mdonm', title: 'MDO', _width: 50
            }),
        ]
    }

    LedgerReport = (dataItem, e) => {
        this._GlobalFunctionVariables.Post('/customer/getledgerreport', { customerid: dataItem.id})
        .subscribe(
            data => {
                let date = (new Date().getDate()+"_"+(new Date().getMonth()+1)+"_"+new Date().getFullYear());
                this._GlobalFunctionVariables.downloadReport(data.data, "pdf", dataItem.cc+"_"+date);
            },
            error => {
                this._GlobalFunctionVariables.ErrorToss("Error to Generate Report, Please try again.")
            }
        );
    }

    ngAfterViewInit() {

        this.CustomerList = this.gridCustomerList.first.objgrid.first;
        let saveObject = this._cookies.GetRemoveCookie('CustomerList');
        let customerid = this._cookies.GetRemoveCookie('customerid');
        if (saveObject) {
            saveObject = JSON.parse(saveObject);
            this.CustomerList.setState(JSON.parse(saveObject.state));
            this.cdr.detectChanges();
        }
        if (customerid) {
            let selectedid = []
            selectedid.push(parseInt(customerid));
            this.CustomerList.setSelectedValue(selectedid);
        }

        this._GlobalFunctionVariables.gridDirectiveInfo = this.CustomerList;

        this.columnsConfig = this._GlobalFunctionVariables.LoadGridColumns(this._GlobalFunctionVariables.gridName, this.columnsConfig) || this.columnsConfig;
        this.CustomerList.rebind();
    }

    edit = (dataItem, e) => {
        debugger;
        this._cookies.SetState('CustomerList', this.CustomerList.getState());
        this._cookies.SetCookie('customerid', dataItem.id);
        this.router.navigate(['/customermaster/detail']);
    }

    SaveasExcel = () => {
        this.CustomerList.saveAsExcel()
    }
    ngOnInit() { this.gridHeight = window.innerHeight - 110 }
}