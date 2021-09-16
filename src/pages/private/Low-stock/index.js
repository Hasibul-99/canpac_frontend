import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table} from 'antd';
import { postData } from '../../../scripts/api-service';
import { PRODUCT_STOCK_LOW } from '../../../scripts/api';

export default function LowStock() {
  const [products, setProducts] = useState()

    const columns = [
        {
          title: 'Product Name',
          dataIndex: 'product',
          key: 'id',
          render: (record) => <>
              { record.product_name }
          </>
        },
        {
          title: 'Date',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Quantity (can)',
          dataIndex: 'low_stock',
          key: 'low_stock',
        }
    ];

    const getProducts = async () => {
      let res = await postData(PRODUCT_STOCK_LOW, {});

      if (res) {
        setProducts(res.data.data);
      }
    }

    useEffect(() => {
      getProducts();
    }, [])
    
    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Low Stock</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <Table dataSource={products} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
