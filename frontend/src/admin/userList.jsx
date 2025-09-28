import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, getUsers } from "../actions/userActions"
import { clearError, clearUserDeleted } from "../slices/userSlice"
import Loader from '../components/layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify'
import Sidebar from "./sidebar"

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState)
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'Email', field: 'email', sort: 'asc' },
                { label: 'Role', field: 'role', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: <span className="text-secondary fw-bold">{user._id}</span>,
                name: <span className="text-primary fw-bold">{user.name}</span>,
                email: <span className="text-dark">{user.email}</span>,
                role: (
                    <span className={`badge ${user.role === "admin" ? "bg-success" : "bg-warning text-dark"}`}>
                        {user.role.toUpperCase()}
                    </span>
                ),
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/user/${user._id}`}
                            className="btn btn-sm btn-info me-2"
                            style={{ borderRadius: "8px", color: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button
                            onClick={e => deleteHandler(e, user._id)}
                            className="btn btn-sm btn-danger"
                            style={{ borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
                        >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isUserDeleted) {
            toast('User Deleted Successfully!', {
                type: 'success',
                position: "bottom-center",
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
        
    }, [dispatch, error, isUserDeleted])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4 text-center text-primary fw-bold">🌟 User List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setUsers()}
                            bordered
                            striped
                            hover
                            responsive
                            noBottomColumns
                            className="px-3 shadow-lg rounded bg-light "
                            sortable
                        />
                    }
                </Fragment>
            </div>
        </div>
    )
}
