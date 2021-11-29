import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {
    createDirectory,
    getFiles,
    popDirectoryStack,
    selectCurrentDirectory,
    selectDirectoryStack,
} from "../../../reducers/file.slice";
import FileList from "../file-list/FileList";
import PopupCreateDirectory from "../popup-create-directory/PopupCreateDirectory";
import "./filesWrapper.css";

const FilesWrapper = () => {
    const dispatch = useDispatch();
    const currentDirectory = useSelector(selectCurrentDirectory);
    const directoryStack = useSelector(selectDirectoryStack);

    const [isVisible, setIsVisible] = useState(false);
    const changeVisible = () => setIsVisible((oldValue) => !oldValue);

    function getFilesForDirectory() {
        dispatch(getFiles(currentDirectory))
    }

    useEffect(getFilesForDirectory, [dispatch, currentDirectory]);

    const onStepBack = () => {
        dispatch(popDirectoryStack());
    }

    const createDir = (name) => {
        const type = 'dir';
        dispatch(createDirectory({type, name, parent: currentDirectory}));
    }

    const isDisabledStepBack = directoryStack.length <= 1;

    return (
        <>
            <div className="filesWrapper">
                <div className="buttons">
                    <Button key="1" type="default" onClick={onStepBack} disabled={isDisabledStepBack}>Назад</Button>
                    <Button key="2" type="default" onClick={changeVisible}>Создать папку</Button>
                </div>
                <FileList/>
            </div>
            <PopupCreateDirectory isVisible={isVisible} closeModal={changeVisible} createDir={createDir}/>
        </>
    );
};
export default FilesWrapper;