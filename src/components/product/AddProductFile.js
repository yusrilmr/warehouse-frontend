/* eslint-disable */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {DropzoneDialog} from "material-ui-dropzone";
import AttachFile from "@material-ui/icons/AttachFile";
import {toast} from "react-toastify";
import ProductAPI from "../../services/productAPI";

const AddProductFile = (props) => {
    const [open, setOpen] = useState(false);

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    // Save files
    const handleSave = (files) => {
        const fileReader = new FileReader();
        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
            const fileContent = e.target.result;
            new ProductAPI().uploadProductFile(fileContent)
                .then(res => {
                    if (res.ok){
                        toast.success("Products file uploaded", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                        props.fetchProductQuantities();
                    }
                    else if (res.status === 409) {
                        toast.error("Duplicate product", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    }
                    else {
                        toast.error("Error when uploading. Please recheck your file.", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    }
                })
                .catch(err => {
                    toast.error("Error when uploading. Please recheck your file.", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                })
        };
        setOpen(false);
    };

    // Open the modal form
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleOpen.bind(this)}>
                Upload
            </Button>
            <DropzoneDialog
                Icon={AttachFile}
                open={open}
                onSave={handleSave.bind(this)}
                acceptedFiles={['application/json']}
                showPreviews={true}
                maxFileSize={5000000} // 5mb
                onClose={handleClose.bind(this)}
                filesLimit={1} />
        </div>
    );
};
export default AddProductFile;