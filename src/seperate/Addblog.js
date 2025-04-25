import React, { useRef, useEffect, useMemo, useState } from 'react';
import Dashboard from './Dashboard'
import { GrCloudComputer } from "react-icons/gr";
import ReactQuill, { Quill } from 'react-quill';
import { quillBetterTable } from 'quill-better-table';
import 'react-quill/dist/quill.snow.css';
import "quill-better-table/dist/quill-better-table.css";
import { useFormik } from 'formik';
import { getcategorylist, blogsAdd } from '../api/authapi'
import { blogschema } from "./utils/helper"
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineArrowCircleLeft } from "react-icons/md";
// Quill.register({ 'modules/better-table': quillBetterTable, }, true);

function Addblog() {

    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [categories, setCategories] = useState([])


    const formik = useFormik({
        initialValues: {
            blogtitle: '',
            bloglink: '',
            blogoptions: '',
            blogmetatitle: '',
            blogmetadescription: '',
            blogmetakey: '',
            blogimage: null,
            blogcontent: '',
        },
        validationSchema: blogschema,
        onSubmit: async (values, actions) => {
            console.log("value---", values);
            try {
                const formData = new FormData();
                formData.append('blogtitle', values.blogtitle);
                formData.append('bloglink', values.bloglink);
                formData.append('blogoptions', values.blogoptions);
                formData.append('blogmetatitle', values.blogmetatitle);
                formData.append('blogmetadescription', values.blogmetadescription);
                formData.append('blogmetakey', values.blogmetakey);
                formData.append('blogimage', values.blogimage);
                formData.append('blogcontent', values.blogcontent);
                formData.append('Status',true);

                const response = await blogsAdd(formData);
                console.log("reponse---", response);
                if (response.status === true) {
                    toast.success("Blog Submitted Successfully")
                    actions.resetForm();
                    setTimeout(() => {
                    //  navigate('/dashboard/domestic')                         
                    }, 1350);
                } else {
                    toast.warn("error on blog");
                }
            } catch (error) {
                toast.warn("error on blog");
            }
        },
    });

    const handleimageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('blogimage', file);
    }

    const handleChange = (content, delta, source, editor) => {
        formik.setFieldValue('blogcontent', editor.getHTML());
    };

    const insertTable = () => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const tableModule = editor.getModule('better-table');

            // Check if tableModule is defined
            if (tableModule) {
                tableModule.insertTable(3, 3);
            }
        }
    };

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const toolbar = editor.getModule('toolbar');

            // Only add the handler if the toolbar is available
            if (toolbar) {
                toolbar.addHandler('table', () => {
                    insertTable();
                });
            }
        }
    }, []);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ size: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video', 'table'],
            ['clean'],
        ],
        // table:false,
        // 'better-table': {
        //     operationMenu: {
        //         items: {
        //             unmergeCells: {
        //                 text: 'Another unmerge cells name',
        //             },
        //         },
        //     },
        // },
        // keyboard: {
        //     bindings: quillBetterTable.keyboardBindings,
        // },
    };
    const getdatacategory = async () => {
        try {
            const response = await getcategorylist();
            // console.log("response", response.data);
            const Category = response.data
            setCategories(Category);
        } catch (error) {
            console.log('getdatacategory', error);
        }
    }

    useEffect(() => {
        getdatacategory();
    }, [categories])


    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='custom-addblog min-vh-100 text-white'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='row'>
                                <div className='col-lg-2'>
                                    <Dashboard />
                                </div>
                                <div className='col-md-12 ms-sm-auto col-lg-10 px-md-4  m-0 p-0'>
                                    <div className='custom-inside-addblog'>
                                        <h2><a className='me-3' href='/dashboard/domestic'><MdOutlineArrowCircleLeft /></a>Add Blogs</h2>
                                        <div className='row justify-content-center align-items-center text-center'>
                                            <div className='col-lg-10 '>
                                                <div className='custom-addblogs-1'>
                                                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputBlogTitle" class="col-sm-3 col-form-label text-end">Blog Title</label>
                                                            <div class="col-sm-9">
                                                                <input type="text"
                                                                    class="form-control input-text-2"
                                                                    id="inputBlogTitle"
                                                                    placeholder='title'
                                                                    name='blogtitle'
                                                                    value={formik.values.blogtitle}
                                                                    onChange={formik.handleChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogtitle && formik.errors.blogtitle ? (<span style={{fontSize:"12px"}}>{formik.errors.blogtitle}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputBlogLink" class="col-sm-3 col-form-label text-end">Blog Link</label>
                                                            <div class="col-sm-9">
                                                                <input type="text"
                                                                    class="form-control input-text-2"
                                                                    id="inputBlogLink"
                                                                    placeholder='link'
                                                                    name='bloglink'
                                                                    value={formik.values.bloglink}
                                                                    onChange={formik.handleChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.bloglink && formik.errors.bloglink ? (<span style={{fontSize:"12px"}}>{formik.errors.bloglink}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="mb-2 row mt-3">
                                                            <label class="col-form-label col-sm-3 text-end" for="inputEmail3">Blog Category</label>
                                                            <div className='col-sm-9'>
                                                                <select
                                                                    class="form-select input-text-2"
                                                                    id="inputGroupSelect01"
                                                                    placeholder="jjjjj"
                                                                    name='blogoptions'
                                                                    value={formik.values.blogoptions}
                                                                    onChange={formik.handleChange}>
                                                                    <option value="" disabled selected>Choose...</option>
                                                                    {categories && categories.map((category, index) => (
                                                                        <option key={index} value={category.category}>
                                                                            {category.category}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogoptions && formik.errors.blogoptions ? (<span style={{fontSize:"12px"}}>{formik.errors.blogoptions}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputMetaTitle" class="col-sm-3 col-form-label text-end">Blog Meta Title</label>
                                                            <div class="col-sm-9">
                                                                <input type="text"
                                                                    class="form-control input-text-2"
                                                                    id="inputMetaTitle"
                                                                    placeholder='Blog Meta Link'
                                                                    name='blogmetatitle'
                                                                    value={formik.values.blogmetatitle}
                                                                    onChange={formik.handleChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogmetatitle && formik.errors.blogmetatitle ? (<span style={{fontSize:"12px"}}>{formik.errors.blogmetatitle}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputMetadescription" class="col-sm-3 col-form-label text-end">Blog Meta description</label>
                                                            <div class="col-sm-9">
                                                                <input type="text"
                                                                    class="form-control input-text-2"
                                                                    id="inputMetadescription"
                                                                    placeholder='Blog Meta description'
                                                                    name='blogmetadescription'
                                                                    value={formik.values.blogmetadescription}
                                                                    onChange={formik.handleChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogmetadescription && formik.errors.blogmetadescription ? (<span style={{fontSize:"12px"}}>{formik.errors.blogmetadescription}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputMetaKeyWords" class="col-sm-3 col-form-label text-end">Blog Meta KeyWords</label>
                                                            <div class="col-sm-9">
                                                                <input type="text"
                                                                    class="form-control input-text-2"
                                                                    id="inputMetaKeyWords"
                                                                    placeholder='Blog Meta KeyWords'
                                                                    name='blogmetakey'
                                                                    value={formik.values.blogmetakey}
                                                                    onChange={formik.handleChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogmetakey && formik.errors.blogmetakey ? (<span style={{fontSize:"12px"}}>{formik.errors.blogmetakey}</span>) : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <div class="row mb-3">
                                                            <label for="inputEmail3" class="col-sm-3 col-form-label text-end">Blog Schema</label>
                                                            <div class="col-sm-9">
                                                                <textarea 
                                                                class="form-control input-text-2" 
                                                                id="exampleFormControlTextarea1" 
                                                                rows="3"
                                                                name=''
                                                                value=''
                                                                onChange=''></textarea>
                                                            </div>
                                                        </div> */}
                                                        <div class="row mb-2 mt-3">
                                                            <label for="inputEmail3" class="col-sm-3 col-form-label text-end">Blog Image</label>
                                                            <div class=" mb-0 col-sm-9 " style={{ width: '75%' }}>
                                                                <input
                                                                    type="file"
                                                                    class="form-control input-text-2 mb-2"
                                                                    placeholder="Recipient's username"
                                                                    aria-label="Recipient's username"
                                                                    aria-describedby="button-addon2"
                                                                    name='blogimage'
                                                                    accept='image/*'
                                                                    onChange={handleimageChange} />
                                                                <div style={{ color: "#b10c0c" }} className='text-start'>
                                                                    {formik.touched.blogimage && formik.errors.blogimage ? (<span style={{fontSize:"12px"}}>{formik.errors.blogimage}</span>) : null}
                                                                </div>
                                                            </div>

                                                            {/* <div className='col-lg-12 text-start'>
                                                                <GrCloudComputer style={{ fontSize: "30px", marginTop: "10px" }} />
                                                            </div> */}
                                                        </div>


                                                        <div class="row mb-3 mt-4">
                                                            <label for="inputEmail3" class="col-sm-3 col-form-label text-end">Blog Content</label>
                                                            <div class="col-sm-9 mb-2 custom-edit-1">
                                                                <ReactQuill
                                                                    className="custom-quill"
                                                                    ref={quillRef}
                                                                    style={{ width: '100%' }}
                                                                    value={formik.values.blogcontent}
                                                                    onChange={handleChange}
                                                                    modules={modules}
                                                                    placeholder="Write something..."
                                                                />
                                                                <div style={{ color: "#b10c0c" }} className='text-start mt-2'>
                                                                    {formik.touched.blogcontent && formik.errors.blogcontent ? (<span style={{fontSize:"12px"}}>{formik.errors.blogcontent}</span>) : null}
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='text-center'>
                                                            {/* <button className='liquidity-btn-1 mt-4' type="submit" disabled={formik.isSubmitting}>Add</button> */}
                                                            <button className={`${formik.isSubmitting ? "disable-btn-1 mt-4" : "liquidity-btn-1 mt-4"}`} type="submit" disabled={formik.isSubmitting}>Update</button>

                                                        </div>
                                                    </form>
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
        </div>
    )
}

export default Addblog