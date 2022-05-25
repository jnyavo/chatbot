import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize,Sort, ContextMenu,Filter, Toolbar, Page, Search,Inject} from '@syncfusion/ej2-react-grids';
import { employeesData, contextMenuItems, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { Column } from '@syncfusion/ej2-react-charts';
const Orders = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header title="Employees" category="Page" />
      <GridComponent
        dataSource={employeesData}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {employeesGrid.map((item,index)=>(
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search,Page,Toolbar]} />
      </GridComponent>
    </div>
  )
}

export default Orders