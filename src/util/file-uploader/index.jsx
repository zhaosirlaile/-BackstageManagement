import FileUpload   from './FileUploader.jsx'

import React        from 'react'


class FileUploader extends React.Component {
    constructor (props) {
        super(props)
        
    }
    
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {this.props.onSuccess(res.data)},
            uploadError:(err) => {this.props.onError(err.message || '双层图片出错拉')}
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className='btn btn-xs btn-default' ref="chooseAndUpload">选择图片</button>
            </FileUpload>
        )	        
    }

}


export default FileUploader