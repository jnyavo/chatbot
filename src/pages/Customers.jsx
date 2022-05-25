import React from 'react';
import { Header } from '../components';

import {GridComponent, ColumnsDirective, ColumnDirective, Page, Selection,Inject,Edit,Toolbar,Sort,Filter} from '@syncfusion/ej2-react-grids';

import {customersData,customersGrid} from '../data/dummy';

const Customers = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header title="Customers" category="Page" />
      <GridComponent
        dataSource={customersData}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{allowDeleting:true,allowEditing:true}}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item,index)=>(
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar,Selection,Edit,Sort,Filter]} />
      </GridComponent>
    </div>
  )
}

export default Customers