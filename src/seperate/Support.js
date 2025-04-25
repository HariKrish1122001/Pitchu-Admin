
import DataTable from "react-data-table-component";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { getInternationalWinners, getInternationalSendReward } from "../api/adminControl";
import { ToastContainer, toast } from "react-toastify";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getSupportmsg, deleteMsg } from "../api/adminControl";
import { encryptData, decryptData } from "./utils/securedata";



function Support() {
    const [msg, setMsg] = useState([]);
    const [deleteCheckBox, setdeleteCheckBox] = useState([]);
    console.log("deleteCheckBox", deleteCheckBox)
    const getSupport = async () => {
        try {
            const res = await getSupportmsg();
            if (res.status == true) {
                const msg = decryptData(res.data);
                setMsg(msg);
            } else {
                setMsg([]);
            }
        } catch (error) {
            console.log(error);
            setMsg([]);
        }
    }

    useLayoutEffect(() => {
        getSupport();
    }, [])


    const columns = [
        {
            selector: (row) => row.input,
            sortable: true,
            width: "100px",
        },
        {
            name: "id",
            selector: (row) => row.Name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: true,
            width: "150px",
        },
        {
            name: "email",
            selector: (row) => row.email,
            sortable: true,
            width: "150px",
        },
        {
            name: "Contact",
            selector: (row) => row.Contact,
            sortable: true,
            width: "150px",
        },
        {
            name: "Description",
            selector: (row) => row.Description,
            sortable: true,
            width: "150px",
        },
        {
            name: "View",
            selector: (row) => row.View,
            sortable: true,
            width: "150px",
        },
    ];

    const handleCheck = (data, index) => {
        try {
            setdeleteCheckBox((prev) => {
                const isChecked = prev.some((item) => item.index === index);
                if (isChecked) {
                    return prev.filter((item) => item.index !== index);
                } else {
                    return [...prev, { index, data }];
                }
            });
        } catch (error) {
            console.log("error>>>>", error)
            console.error(error);
        }
    };

    const handleDelete = async (items) => {
        try {
            if (items.length > 0) {
                const en = encryptData(items);
                const res = await deleteMsg(en);
                if (res.status == true) {
                    toast.success("Deleted success!");
                    await getSupport();
                } else {
                    toast.error("Deleted failed!");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const data = msg.map((items, index) => {

        return {
            id: index,
            input:
                <div>
                    <div class="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`gridCheck${index}`}
                            onChange={() => handleCheck(items, index)}
                            checked={deleteCheckBox.some((item) => item.index === index)}
                        />

                    </div>
                </div>,
            id:
                <div>
                    {items.clientId}
                </div>,
            Name:
                <div>
                    {items.name}
                </div>,
            email:
                <div>
                    {items.email}
                </div>,
            Contact:
                <div>
                    {items.contact}
                </div>,
            Description:
                <div>
                    {items.message}
                </div>,
            View:
                <div>
                    <button type="button" class="dashboard-btn-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        View
                    </button>


                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header border-0">
                                    {/* <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> */}
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="modal-custom">
                                        <h2 className="text-center">Descripition</h2>
                                        <p>{items.message}</p>
                                    </div>
                                </div>
                                <div class="modal-footer border-0">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
        }

    })

    return (
        <div className="App">
            {/* <Navbar /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="Route3-active-class">
                            <div className="variable-domestic-dashboard">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h2>Support</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="text-end mb-3">
                                                    {
                                                        deleteCheckBox.length > 0 ?
                                                            <button className="dashboard-btn-3" onClick={() => {
                                                                handleDelete(deleteCheckBox)
                                                            }} >
                                                                Delete
                                                            </button>
                                                            :
                                                            <button className="dashboard-btn-3 opacity-50" >
                                                                Delete
                                                            </button>
                                                    }
                                                </div>


                                                <div className="dashboard-table text-dark">
                                                    <DataTable
                                                        columns={columns}
                                                        data={data}
                                                        theme="solarized"
                                                        defaultSortAsc={true}
                                                        // pagination
                                                        highlightOnHover
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );

}

export default Support;
