import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {createDirectory, getFiles, selectCurrentDirectory} from "../../../reducers/file.slice";
import FileList from "../file-list/FileList";
import PopupCreateDirectory from "../popup-create-directory/PopupCreateDirectory";
import "./filesWrapper.css";

const FilesWrapper = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(selectCurrentDirectory);

    const [isVisible, setIsVisible] = useState(false);
    const changeVisible = () => setIsVisible((oldValue) => !oldValue);

    function getFilesForDirectory() {
        dispatch(getFiles(currentDirectory))
    }
    useEffect(getFilesForDirectory, [currentDirectory]);

    const createDir = (name) => {
        const type = 'dir';
        dispatch(createDirectory({type, name, parent: currentDirectory}));
    }

    return (
        <div className="filesWrapper">
            <PopupCreateDirectory isVisible={isVisible} closeModal={changeVisible} createDir={createDir}/>
            <div className="buttons">
                <Button key="1" type="default">Назад</Button>
                <Button key="2" type="default" onClick={changeVisible}>Создать папку</Button>
            </div>
            <FileList/>
        </div>
    );
};

export default FilesWrapper;