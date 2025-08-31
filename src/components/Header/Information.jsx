import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import History from "./UserInfo/History";
import Password from "./UserInfo/Password";
import Profile from "./UserInfo/Profile";
import { useTranslation } from "react-i18next";

function Information({ show, handleClose }) {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{t("header.information")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title={t("header.info.profile")}>
            <Profile />
          </Tab>
          <Tab eventKey="profile" title={t("header.info.password")}>
            <Password />
          </Tab>
          <Tab eventKey="contact" title={t("header.info.history")}>
            <History />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default Information;
