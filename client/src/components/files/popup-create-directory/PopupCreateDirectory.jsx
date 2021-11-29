import {useState} from "react";
import {Input, Modal} from 'antd';

const PopupCreateDirectory = ({isVisible, closeModal, createDir}) => {

    const [value, setValue] = useState('');
    const changeValue = e => setValue(e.target.value);

    const onCreateDirectory = () => {
        if(value) {
            createDir(value);
            closeModal();
            setValue('');
        }
    }

    const onCancel = () => {
        closeModal();
        setValue('');
    }

    return (
        <Modal
            visible={isVisible}
            onCancel={onCancel}
            onOk={onCreateDirectory}
            title='Введите имя папки'
            // centered
        >
            <Input
                placeholder='Введите имя папки'
                value={value}
                onChange={changeValue}
                autoFocus
                autoComplete='off'
            />
        </Modal>
    );
};

export default PopupCreateDirectory;