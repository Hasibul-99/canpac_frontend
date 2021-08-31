import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import {Table} from 'antd';

export default function LowStock() {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Date',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Quantity (can)',
          dataIndex: 'key',
          key: 'address',
        }
    ];
    
    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Product Stock</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
