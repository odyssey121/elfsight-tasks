import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { showSuccessModal } from "../modal";
import { config } from "../conf";
import "./showModal.css";
import QuestionPopover from "../questionPopover";

const { TextArea } = Input;

const { Fragment } = React;

class PopUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = e => {
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    render() {

        return (

                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.onSubmit}
                    className="register-window"
                    centered={true}
                    onCancel={this.handleCancel}
                    cancelText="Отмена"
                    okText="Создать"
                    cancelButtonProps={{ type: "danger" }}
                >
                    <div className="register-layout">
                        <h1>Hello World</h1>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default PopUp;