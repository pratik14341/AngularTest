//d : Display Name
//r : Rights
//U : URl
//I : Icon
//C : Child Menu
module.exports = [
    { 
        d: 'Dashboard',
        r: 'noaction', 
        u: '', 
        i:'/src/app/images/icons/dashboard_icon.png', 
        c: [
            { 
                d: 'Dashboard', 
                r: 'noaction', 
                u: '/dashboard',
                ul:[],
                i:'' 
            }
        ] 
    },
    {
        d: 'Master', 
        r: 'master', 
        u: '',
        i:'/src/app/images/icons/admin_icon.png', 
        c: [
            { 
                d: 'Employee', 
                r: 'employee', 
                u: '/employeelist', 
                ul:[
                    '/employeelist',
                    '/employeelist/employeeentry'
                ],
                i:'' 
            },
            { 
                d: 'Sub Region', 
                r: 'subregion', 
                u: '/subregion/List',
                ul:[
                    '/subregion/List'
                ],
                i:'' 
            }
        ]
    },
    {
        d: 'Customer', 
        r: 'customer', 
        u: '',
        i:'/src/app/images/icons/clients_icon.png', 
        c: [
            { 
                d: 'Customer Master', 
                r: 'customermaster', 
                u: '/customermaster', 
                ul:[
                    '/customermaster',
                    '/customermaster/detail'
                ],
                i:'' 
            },
        ]
    },
    {
        d: 'Order Management', 
        r: 'ordermanagement', 
        u: '', 
        i:'/src/app/images/icons/orders_icon.png', 
        c: [
            {
                d: 'Order',
                r: 'order',
                u: '/ordermanagement/order',
                ul: [
                    '/ordermanagement/order'
                ],
                i:''
            }
        ]
    },
    {
        d: 'Reports', 
        r: 'reports', 
        u: '',
        i:'/src/app/images/icons/reports_icon.png', 
        c: [
            { 
                d: 'Sales Report', 
                r: 'salesreport', 
                u: '/reports/salesreport', 
                ul:[
                    '/reports/salesreport'
                ],
                i:'' 
            },
            { 
                d: 'Sales Return', 
                r: 'salesreturn', 
                u: '/reports/salesreturn', 
                ul:[
                    '/reports/salesreturn'
                ],
                i:'' 
            },
            { 
                d: 'Collection Report', 
                r: 'collectionreport', 
                u: '/reports/aging', 
                ul:[
                    '/reports/aging'
                ],
                i:'' 
            },
            { 
                d: 'Inventory Report', 
                r: 'inventoryreport', 
                u: '/reports/productmaster', 
                ul:[
                    '/reports/productmaster'
                ],
                i:'' 
            },
            { 
                d: 'Average DSO', 
                r: 'averagedso', 
                u: '/reports/averagedso', 
                ul:[
                    '/reports/averagedso'
                ],
                i:'' 
            },
        ]
    },
    {
        d: 'User Management', 
        r: 'usermanagement', 
        u: '' ,
        i:'/src/app/images/icons/userrights_icon.png', 
        c: [
            { 
                d: 'Users', 
                r: 'userlogin', 
                u: '/userlogin',
                ul:[
                    '/userlogin',
                    '/userlogin/userentry'
                ],
                i:'' 
            },
            { 
                d: 'Role', 
                r: 'role', 
                u: '/role',
                ul:[
                    '/role'
                ],
                i:'' 
            }
        ]
    }
];