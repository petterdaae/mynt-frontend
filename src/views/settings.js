import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

const StyledForm = styled(Form)`
    margin-top: 50px;
    width: 500px;
`;

function Settings() {
    const onFinish = (values) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/secrets/sbanken`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(values)
        });
    };

    return (
        <StyledForm
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item label="Sbanken ClientID" name="sbanken_client_id">
                <Input />
            </Form.Item>

            <Form.Item label="Sbanken Client Secret" name="sbanken_client_secret">
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </StyledForm>
    );
};

export default Settings;
