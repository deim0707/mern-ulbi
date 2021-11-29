import { Form, Input, Button } from 'antd';
import "./loginRegistrationForm.css";

const LoginRegistrationForm = ({omSubmit}) => {
    return (
        <div className='loginRegistrationFormWrapper'>
            <Form
                className='loginRegistrationForm'
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={omSubmit}
                // onFinishFailed={onError}
                autoComplete="off"
            >
                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста введите электронную почту' }]}
                >
                    <Input type="email"/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginRegistrationForm;