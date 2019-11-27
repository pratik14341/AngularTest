import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule,LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import * as comp from './typescripts';
import { AuthGuard } from './_guards/auth.guard';
import { GlobalFunctionVariables } from "./_helpers/GlobalFunctionVariables";
import { HttpPost } from './_helpers/httpPost';
import { Cookies } from './_helpers/cookies';
import { JwtInterceptor } from './_helpers/JwtInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule,PDFModule,ExcelModule   } from '@progress/kendo-angular-grid';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridBindingDirective } from './directive/GridBinding';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomeGridComponent } from './directive/gridComponent';
import { HasRightsDirective } from './directive/hasRights';
import { EqualValidator, OnlyNumber, EmailValidator } from './directive/Directive';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IntlModule } from '@progress/kendo-angular-intl';
// import '@progress/kendo-angular-intl/locales/en-GB/all';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AngularDraggableModule } from 'angular2-draggable';
import '@progress/kendo-angular-intl/locales/en-IN/all';
//import '@progress/kendo-angular-intl/locales/en/all';
import { GrdFilterPipe } from './directive/grdFilter';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';  
import { MenuModule } from '@progress/kendo-angular-menu';

@NgModule({
  declarations: [
    AppComponent,
    GridBindingDirective,
    CustomeGridComponent,
    HasRightsDirective, 
    EqualValidator, 
    OnlyNumber, 
    EmailValidator, 
    GrdFilterPipe,
    comp.LoginComponent, 
    comp.HomeComponent,
    comp.DashboardComponent,
    comp.RedirectComponent,
    comp.UserLoginListComponent,
    comp.UserLoginEntryComponent,
    comp.subregionListComponent,
    comp.ForgotComponent,
    comp.ExistingLoginComponent,
    comp.RoleComponent,
    comp.DialogsComponent,
    comp.confirmdialogComponent,
    comp.CustomerListComponent,
    comp.CustomerDetailComponent,
    comp.salesReportComponent,
    comp.salesReturnReportComponent,
    comp.agingReportComponent,
    comp.productMasterReportComponent,
    comp.averageDsoReportComponent,
    comp.orderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    UploadModule,
    PDFModule,
    ExcelModule,
    IntlModule,
    ReactiveFormsModule, 
    HttpClientModule,
    routing, 
    FormsModule, 
    HttpModule,
    ClickOutsideModule,
    AngularDraggableModule,
    DateInputsModule, 
    InputsModule, 
    LayoutModule, 
    DialogsModule, 
    MenuModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCdF0WFHTZcEEybw1vawIYv_cZ3GkFhYdw'
      apiKey: environment.G_MAP_Key
      //apiKey: 'AIzaSyAhhbujIVU3BgQoBeeEsQDTtrnaw7E2kSE'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],

  providers: [
    AuthGuard, 
    HttpPost, 
    GlobalFunctionVariables,
    Cookies,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,  
      multi: true 
    },
    { 
      provide: LOCALE_ID, 
      useValue: 'en-IN' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
