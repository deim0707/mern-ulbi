import "./fileList.css";
import {useSelector} from "react-redux";
import {selectFiles} from "../../../reducers/file.slice";
import File from "../file/File";

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
                    const {name, type, size, date, _id} = file;
                    return <File
                        key={_id}
                        name={name}
                        type={type}
                        size={size}
                        date={date.slice(0,10)}
                    />
                })
            }
        </div>
    );
};

export default FileList;