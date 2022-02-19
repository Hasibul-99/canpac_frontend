import React, { Fragment, useEffect, useState } from 'react';
import { Card, Checkbox, Button ,Row, Col } from 'antd';
import { Link, useHistory, useParams } from "react-router-dom";
import { postData } from '../../../scripts/api-service';
import { DROPDOWN_LIST, MARCHENT_PRODUCT_MODEL, MARCHENT_PRODUCT_MODEL_ASSIGN } from '../../../scripts/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { alertPop } from '../../../scripts/helper';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

export default function AddProductModel() {
    const history = useHistory();
    let { marchentId } = useParams();
    const [selectedModelIds, setSelectedModelIds] = useState([]);
    const [products, setProducts] = useState([]);


    const getMarchentProiductModel = async () => {
        let res = await postData(MARCHENT_PRODUCT_MODEL, {
            merchant_id: marchentId
        });

        if (res) {
            let masterData = res.data.data || [];
            let models = masterData.map(data => data?.product?.id);

            setSelectedModelIds(models);
        }
    }

    const getProductModelList = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "product_model"
        });

        if (res) {
            let masterData = res?.data?.data || [];
            setProducts(masterData);
        }
    };

    const handelProduct = (modelId, checked) => {
        if (checked) {
            setSelectedModelIds(oldArray => [...oldArray, modelId]);
        } else {
             let filter = selectedModelIds.filter(i => i !== modelId);
             setSelectedModelIds(filter);
        }
    };

    const isCheckedModel = (pro) => {
        let fIndex = selectedModelIds.findIndex(mod => mod === pro.id);

        if (fIndex !== -1) return true
        else return false; 
    }

    const assignModel = async () => {
        let res = await postData(MARCHENT_PRODUCT_MODEL_ASSIGN, {
            merchant_id: marchentId * 1,
            product_models: selectedModelIds
        });

        if (res) {
            alertPop('success', "Marchent Product Model Added Successfully!");
            history.push('/merchents');
        }
    }

    useEffect(() => {
        getMarchentProiductModel();
        getProductModelList()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Assign Product Model</h1>
                </div>
            </div>

            {
                products?.length ? <>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 500,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={products.length}
                            hasMore={products.length < 50}
                            scrollableTarget="scrollableDiv"
                        >
                            <Card>
                                {
                                    products.map(pro => <Card.Grid hoverable={false} style={gridStyle} key={"pro---", pro.id}>
                                        <Checkbox onChange={(e) => handelProduct(pro.id, e.target.checked)} 
                                            checked={isCheckedModel(pro)}>{pro.product_name}</Checkbox>
                                    </Card.Grid>)
                                }
                            </Card>
                        </InfiniteScroll>
                    </div>
                </> : ''
            }
            <Card>
                <Row justify="end">
                    <Col span={4}>
                        <Button type="primary" size="large" onClick={assignModel}>
                            Assign Product Model
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
