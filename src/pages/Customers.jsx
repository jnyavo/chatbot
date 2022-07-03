import React from 'react';
import { Header } from '../components';

import {GridComponent, ColumnsDirective, ColumnDirective, Page, Selection,Inject,Edit,Toolbar,Sort,Filter} from '@syncfusion/ej2-react-grids';

import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";




const Customers = () => {
  const baseUrl = "http://localhost:5000" ;
  const usersGrid = [
    { type: 'checkbox', width: '50' },

    { field: 'name',
      headerText: 'Name',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'email',
      headerText: 'Email',
      textAlign: 'Center',
      width: '150',
    },
    { field: 'type',
      headerText: 'Type',
      width: '100',
      textAlign: 'Center',
    },{
      field: '_id',
      headerText: 'Id',
      textAlign: 'Center',
      width: '150',
    },
  ];

  const data = new DataManager({
    adaptor: new UrlAdaptor(),
    url: baseUrl + '/user/getUserList',
    removeUrl: baseUrl + "/user/deleteUser",
  });
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header title="Customers" category="Page" />
      <GridComponent
        dataSource={data}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{allowDeleting:true}}
        width="auto"
      >
        <ColumnsDirective>
          {usersGrid.map((item,index)=>(
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar,Selection,Edit,Sort,Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers
