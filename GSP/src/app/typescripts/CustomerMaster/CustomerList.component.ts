import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GridBindingDirective } from '../../directive/GridBinding';
import { CustomeGridComponent } from '../../directive/gridComponent';
import { ColumnSettings } from '../../interface';
import { Cookies } from '../../_helpers/cookies';
import { GlobalFunctionVariables } from "../../_helpers/GlobalFunctionVariables";

@Component({
    templateUrl: '../../html/CustomerMaster/CustomerList.html',
    //styleUrls: ['../../css/app.css'],
})
export class CustomerListComponent implements OnInit {
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
@Component({
    templateUrl: '../../html/CustomerMaster/CustomerDetail.html',
    styles: ['agm-map { height: 500px; /* height is required */ }'],
})
export class CustomerDetailComponent implements OnInit {
    gridHeight = 500;
    customerid: number = null;
    markers: any = [];
    Heading: string = "Customer > Customer Master";
    mapHeight: string = "500px"
    ResultTeam: any = [];
    CustomerSalesColumnsConfig: ColumnSettings[] = [];
    CustomerSalesReturnColumnsConfig: ColumnSettings[] = [];
    CustomerCollectionColumnsConfig: ColumnSettings[] = [];
    CustomerSalesItemColumnsConfig: ColumnSettings[] = [];
    constructor(private router: Router, private _GlobalFunctionVariables: GlobalFunctionVariables, private _cookies: Cookies) {
        this._GlobalFunctionVariables.isLoading = false;
        this._GlobalFunctionVariables.HeaderText = 'Customer Master';
        this._GlobalFunctionVariables.gridName = 'CustomerSalesList';
        this.customerid = this._cookies.GetRemoveCookie('customerid');
        if (this.customerid == 0 || this.customerid == null) {
            this.List()
        } else {
            this.GetCustomerDetail()
        }
        this.onLoadSales();
    }
    @ViewChildren(CustomeGridComponent) gridSalesList: QueryList<CustomeGridComponent>;
    CustomerSalesList: GridBindingDirective;
    ngOnInit() { this.mapHeight = (window.innerHeight - 110) + 'px' }
    onTabSelect(e) {
        if(e.index == 1)
        {
            setTimeout(() => {
                this.CustomerSalesList = this.gridSalesList.first.objgrid.first;
                this.CustomerSalesList.refresh();
            });
        } else if(e.index == 2)
        {
            setTimeout(() => {
                this.CustomerSalesList = this.gridSalesList.first.objgrid.first;
                this.CustomerSalesList.refresh();
            });
        } else if(e.index == 3)
        {
            setTimeout(() => {
                this.CustomerSalesList = this.gridSalesList.first.objgrid.first;
                this.CustomerSalesList.refresh();
            });
        }
    }
    mapType = 'TERRAIN'
    lat = 23.033863;
    lng = 72.585022;

    //Sub_ExtraInput = function(dataItem) { return {customerid : dataItem.customerid}};
    Sub_ExtraInput = (dataItem) => { return {invoiceno : dataItem.invoiceno}}

    GetCustomerDetail() {
        this._GlobalFunctionVariables.Post('/customer/getlocationandgspteam', { customerid: this.customerid })
        .subscribe(
            data => {
                if (data.iserror) {
                    this._GlobalFunctionVariables.ErrorToss(data.errormessage);
                } else {
                    this.ResultTeam = data.data;
                    this.markers.push({lat:data.data.lat, lng: data.data.lng})
                    // this.Result = data.data;
                    // this.UserTypeName = this.Result.usertype
                    // this.Result.dob = (data.data.dob) ? new Date(data.data.dob) : null ;
                    // this.GetSubUserTypeList(this.Result.usertypeid)
                     this.Heading += ' > Edit - '+ data.data.cc;
                }
            },
            error => {
                this._GlobalFunctionVariables.ErrorToss("Error to saving record, Please try again.")
            }
        );
    }

    List(){
        this._cookies.SetCookie('customerid', this.customerid);
        this.router.navigate(['/customermaster']);
    }

    onLoadSales = () => {
        this.CustomerSalesColumnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoiceno', title: 'Invoice No.', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoicedate', title: 'Invoice Date', _width: 50, filter: 'date', format: '{0:dd/MM/yyyy}'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'paytermsdesc', title: 'Payment Terms', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'qtycase', title: 'Cases', _width: 50, filter: 'numeric'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'gstamout', title: 'GST Amount', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoicevalue', title: 'Invoice Value', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
        ]
        this.CustomerSalesItemColumnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoiceno', title: 'Invoice No.', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'materialdescription', title: 'Material Description', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'qty', title: 'Qty', _width: 50, filter: 'numeric'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'case', title: 'Case', _width: 50, filter: 'numeric'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'netvalue', title: 'Net Value', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'gst', title: 'GST', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'netamount', title: 'Net Amount', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
        ]
        this.CustomerSalesReturnColumnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoiceno', title: 'Invoice No.', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoicedate', title: 'Invoice Date', _width: 50, filter: 'date', format: '{0:dd/MM/yyyy}'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'gstamout', title: 'GST Amount', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'invoicevalue', title: 'Invoice Value', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'refdoc', title: 'Ref. Doc.', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'refdate', title: 'Ref. Date', _width: 50, filter: 'date', format: '{0:dd/MM/yyyy}'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'otherreason', title: 'Other Reason', _width: 50
            }),
        ]
        this.CustomerCollectionColumnsConfig = [
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'amountinlc', title: 'Amount', _width: 50, filter: 'numeric', format: "{0:c}"
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'bankdatatext', title: 'Mode', _width: 50
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'docdate', title: 'Document Date', _width: 50, filter: 'date', format: '{0:dd/MM/yyyy}'
            }),
            this._GlobalFunctionVariables.AddgridColumns({
                field: 'referenceutrno', title: 'Reference number', _width: 50
            }),
        ]
    }
    ngAfterViewInit() {
        // this.CustomerSalesList = this.gridSalesList.first.objgrid.first;
        //     this.CustomerSalesList.rebind();
    }

    LedgerReport() {
        this._GlobalFunctionVariables.Post('/customer/getledgerreport', { customerid: this.customerid})
        .subscribe(
            data => {
                this._GlobalFunctionVariables.downloadReport(data.data, "pdf", "Ledger Report");
            },
            error => {
                this._GlobalFunctionVariables.ErrorToss("Error to Generate Report, Please try again.")
            }
        );
    }
}