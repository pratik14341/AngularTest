import { RouterModule, Routes } from '@angular/router';
import * as comp from './typescripts';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: comp.HomeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
            rights: 'dashboard'
        },
        children: [
            {
                path: '',
                component: comp.DashboardComponent,
                data: {
                    rights: 'dashboard'
                }
            },
            {
                path: 'dashboard',
                component: comp.DashboardComponent,
                data: {
                    rights: 'dashboard'
                }
            },
            {
                path: 'userlogin',
                component: comp.UserLoginListComponent,
                data: {
                    rights: 'userlogin'
                }
            },
            {
                path: 'userlogin/userentry',
                component: comp.UserLoginEntryComponent,
                data: {
                    rights: 'userlogin'
                }
            },
            {
                path: 'role',
                component: comp.RoleComponent,
                data: {
                    rights: 'role'
                }
            },
            {
                path: 'subregion/List',
                component: comp.subregionListComponent,
                data: {
                    rights: 'subregion'
                }
            },
            {
                path: 'customermaster',
                component: comp.CustomerListComponent,
                data: {
                    rights: 'customermaster'
                }
            },
            {
                path: 'customermaster/detail',
                component: comp.CustomerDetailComponent,
                data: {
                    rights: 'customermaster'
                }
            },
            {
                path: 'reports/salesreport',
                component: comp.salesReportComponent,
                data: {
                    rights: 'salesreport'
                }
            },
            {
                path: 'reports/salesreturn',
                component: comp.salesReturnReportComponent,
                data: {
                    rights: 'salesreturn'
                }
            },
            {
                path: 'reports/aging',
                component: comp.agingReportComponent,
                data: {
                    rights: 'collectionreport'
                }
            },
            {
                path: 'reports/productmaster',
                component: comp.productMasterReportComponent,
                data: {
                    rights: 'inventoryreport'
                }
            },
            {
                path: 'reports/averagedso',
                component: comp.averageDsoReportComponent,
                data: {
                    rights: 'averagedso'
                }
            },
            {
                path: 'ordermanagement/order',
                component: comp.orderComponent,
                data: {
                    rights: 'order'
                }
            }
        ]
    },
    {
        path: 'login',
        component: comp.LoginComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: comp.ExistingLoginComponent
            },
            {
                path: 'GeneratePassword',
                component: comp.ForgotComponent
            },
        ]
    },
    {
        path: 'redirect',
        component: comp.RedirectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '',
        data: {
            rights: 'dashboard'
        }
    }// otherwise redirect to home
];
export const routing = RouterModule.forRoot(appRoutes)