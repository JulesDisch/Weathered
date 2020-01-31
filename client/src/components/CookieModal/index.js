import React from "react";
import Modal from 'react-modal';

const customStyles = {
    content: {
        backgroundColor: "#F0EECA",
        margin: "auto",
        padding: "5px",
        paddingLeft: "20px",
        border: "1px solid #888",
        marginTop: "20%",
        position: "fixed",
        right: "0px",
        left: "0px",
        bottom: "0px"
    }
};

Modal.setAppElement('#root');

export default class CookieModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <Modal className="footer"
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <button id="close" onClick={this.closeModal}>&times;</button>
                <br></br>
                <h4>We use cookies</h4>
                <p style={{ fontSize: 14, clear: "both", textAlign: "left" }}>
                    We use cookies and other tracking technologies to improve your browsing experience on our website, by showing you personalized content. By browsing our website, you consent to our use of cookies and other tracking technologies.</p>
            </Modal>
        );
    }
}