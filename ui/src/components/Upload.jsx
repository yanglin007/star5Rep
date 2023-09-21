import React, { Component } from 'react'
import Axios from 'axios'

export default class Upload extends Component {

    uploadFile = () => {
        let file1 = document.querySelector('#input').files[0]
        let formdata = new FormData()
        formdata.append("files", file1)
        formdata.append("filename", file.name);
        Axios({
            url: '/api/upload',
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formdata
        }).then(
            request => {
                console.log(request.data)
            },
            error => {
                console.log(error.data)
            }
        )
    }

    render() {
        return (
            <div>
                <input type="file" id="input" ></input>
                <button onClick={this.uploadFile}>Upload</button>
            </div>
        )
    }
}
