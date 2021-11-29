import {useDispatch} from "react-redux";
import {pushDirectoryStack} from "../../../reducers/file.slice";
import {ReactComponent as FolderLogo} from '../../../assets/icon/folder.svg';
import {ReactComponent as FileLogo} from '../../../assets/icon/file.svg';
import "./file.css"

const File = ({file}) => {
    const dispatch = useDispatch();
    const {name, type, size, date, _id} = file;
    const isItemDirectory = type === 'dir';

    const openDirectory = () => {
        if (isItemDirectory) {
            dispatch(pushDirectoryStack({path: `/${name}`, breadcrumbName: name, id: _id}));
        }
    }

    const Icon = isItemDirectory ? <FolderLogo/> : <FileLogo/>;
    return (
        <div className="file" onClick={openDirectory}>
            <div className="logo">{Icon}</div>
            <div className="name">{name}</div>
            <div className="date">{date.slice(0, 10)}</div>
            <div className="size">{size}</div>
        </div>
    );
};

export default File;