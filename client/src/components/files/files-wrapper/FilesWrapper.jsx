import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {getFiles, selectCurrentDirectory} from "../../../reducers/file.slice";
import FileList from "../file-list/FileList";
import "./filesWrapper.css";

const FilesWrapper = () => {
    const currentDirectory = useSelector(selectCurrentDirectory);
    const dispatch = useDispatch();

    function getFilesForDirectory() {
        dispatch(getFiles(currentDirectory))
    }

    useEffect(getFilesForDirectory, [currentDirectory]);

    return (
        <div className="filesWrapper">
            <div className="buttons">
                <Button key="1" type="default">Назад</Button>
                <Button key="2" type="default">Создать папку</Button>
            </div>
            <FileList/>
        </div>
    );
};

export default FilesWrapper;