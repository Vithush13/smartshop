import { Fragment, useEffect } from 'react'
import MetaData from '../layouts/Meta';
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderAction';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userOrdersAction)
    }, [dispatch])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order Name",
                    field: 'orderName',
                    sort: "asc",
                    attributes: { className: "font-weight-bold text-primary" }
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions'
                }
            ],
            rows: []
        }

        userOrders.forEach(userOrder => {
            data.rows.push({
                orderName: userOrder.orderItems.length > 0
                    ? userOrder.orderItems[0].name
                    : "Custom Order",
                numOfItems: userOrder.orderItems.length,
                amount: (
                    <span style={{ fontWeight: "600", color: "#2c3e50" }}>
                        Rs.{userOrder.totalPrice.toFixed(2)}
                    </span>
                ),
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered')
                    ? (<span style={{
                        color: 'green',
                        fontWeight: 'bold',
                        background: '#eafbe7',
                        padding: '5px 12px',
                        borderRadius: '12px'
                    }}>{userOrder.orderStatus}</span>)
                    : (<span style={{
                        color: 'red',
                        fontWeight: 'bold',
                        background: '#fdecea',
                        padding: '5px 12px',
                        borderRadius: '12px'
                    }}>{userOrder.orderStatus}</span>),
                actions: (
                    <Link
                        to={`/order/${userOrder._id}`}
                        className="btn btn-sm btn-info"
                        style={{ borderRadius: "8px", padding: "5px 10px" }}
                    >
                        <i className='fa fa-eye'></i> View
                    </Link>
                )
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <h1 className='mt-5 mb-4 text-center text-uppercase font-weight-bold'
                style={{ color: "#34495e", letterSpacing: "2px" }}>
                My Orders
            </h1>
            <MDBDataTable
                className='px-3 '
                bordered
                striped
                hover
                responsive
                data={setOrders()}
            />
        </Fragment>
    )
}
