import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Input, Button, message, Upload, Select } from 'antd';
export const getFileConfig = ({ action, onSucess, data }) => ({
    name: 'file',
    action: action,
    data,
    headers: {
        // authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            onSucess && onSucess();
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    }
});
export const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());