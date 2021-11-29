import {ReactComponent as FolderLogo} from '../../../assets/icon/folder.svg';
import {ReactComponent as FileLogo} from '../../../assets/icon/file.svg';
import "./file.css"

const File = ({name, type, size, date}) => {
    const Icon = type === 'dir' ? <FolderLogo/> : <FileLogo/>;
    return (
        <div className="file">
            <div className="logo">{Icon}</div>
            <div className="name">{name}</div>
            <div className="date">{date}</div>
            <div className="size">{size}</div>
        </div>
    );
};

export default File;