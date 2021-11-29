import {useSelector} from "react-redux";
import {selectFiles} from "../../../reducers/file.slice";
import File from "../file/File";
import "./fileList.css";

const FileList = () => {
    const files = useSelector(selectFiles);
    return (
        <div className="fileList">
            <div className="header">
                <div className='name'>Название</div>
                <div className='date'>Дата</div>
                <div className='size'>Размер</div>
            </div>
            {
                files.map(file => {
                    return <File
                        key={file._id}
                        file={file}
                    />
                })
            }
        </div>
    );
};

export default FileList;