import React, { useState, useEffect } from 'react';
import { getisAdmincheck } from "../../api/authapi"
import * as yup from "yup";

export const CheckTokenIslogin = async () => {
    try {
        const reponse = await getisAdmincheck();

        console.log('reponse', reponse.data[0])
        if (reponse.status === false) {
            return false;
        }

        const value = reponse.data[0];
        const idVal = value._id

        if (!idVal) {
            return false;
        }

        const token = localStorage.getItem('Admtoken');
        if (!token) {
            return false;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        let decoded_id = decodedToken.AdminId

        if (idVal === decoded_id) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log("CheckTokenIslogin error", error);
        if (error.name === "InvalidTokenError") {
            console.log("InvalidTokenError");
            return false;
        }
    }
}



const MAX_FILE_SIZE = 5242880; // 5MB in bytes
const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'webp'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}
export const blogschema = yup.object().shape({
    blogtitle: yup.string().required("blogtitle field required"),
    bloglink: yup.string().required("blogtitle field required"),
    blogoptions: yup.string().required("blogoptions field required"),
    blogmetatitle: yup.string().required("blogmetatitle field required"),
    blogmetadescription: yup.string().required("blogmetadescription field required"),
    blogmetakey: yup.string().required("blogmetakey field required"),
    blogimage: yup.mixed()
        .test("is-valid-type", "Only ['jpg', 'png', 'jpeg', 'webp'] are allowed as valid image types.",
            value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 5MB",
            value => value && value.size <= MAX_FILE_SIZE)
        .required("blogimage field required"),
    blogcontent: yup.string()
        .test("test-content", "blogcontent field required", (val) => {
            if (val.trim() === "<p><br><\/p>") {
                return false
            } else {
                return true
            }
        })
        .required("blogcontent field required"),
});



export const editErrSchema = yup.object().shape({
    blogtitle: yup.string().required("blogtitle field required"),
    bloglink: yup.string().required("blogtitle field required"),
    blogoptions: yup.string().required("blogoptions field required"),
    metatitle: yup.string().required("blogmetatitle field required"),
    metadescription: yup.string().required("blogmetadescription field required"),
    metakey: yup.string().required("blogmetakey field required"),
    blogimage: yup.mixed()
        .test("is-valid-type", "Only ['jpg', 'png', 'jpeg', 'webp'] are allowed as valid image types.",
            value => {
                if (value.name === undefined) {
                    return true
                } else {
                    return isValidFileType(value && value.name.toLowerCase(), "image")
                }
            })
        .test("is-valid-size", "Max allowed size is 5MB",
            value => {
                if (value.size === undefined) {
                    return true
                } else {
                    return value && value.size <= MAX_FILE_SIZE
                }
            })
        .required("blogimage field required"),
    blogcontent: yup.string()
        .test("test-content", "blogcontent field required", (val) => {
            if (val.trim() === "<p><br><\/p>") {
                return false
            } else {
                return true
            }
        })
        .required("blogcontent field required"),
})

