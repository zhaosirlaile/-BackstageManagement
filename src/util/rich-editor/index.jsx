import React,{Component} from 'react'

import Simditor from 'simditor';

import 'simditor/styles/simditor.scss'

import './index.scss'
class RichEditor extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    loadEditor(){
        let element = this.refs['textarea']
        this.simeditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        })
        this.bindEditorEvent();
    }
    bindEditorEvent(){
        this.simeditor.on('valuechanged', e => {
            this.props.onValueChange(this.simeditor.getValue())
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simeditor.setValue(nextProps.defaultDetail);
        }
    } 
    render(){
        return (
            <div className='rich-editor'>
                <textarea ref='textarea'>

                </textarea>
            </div>
        )
    }
}

export default RichEditor