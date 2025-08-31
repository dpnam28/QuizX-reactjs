import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { postChangePassword } from "../../../services/apiServices";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.warn("Missing parameters", { closeOnClick: true });
      return;
    }

    let res = await postChangePassword(currentPassword, newPassword);
    if (res?.EC === 0) {
      toast.success(res?.EM ?? "Succeeded", { closeOnClick: true });
    } else {
      toast.warn(res?.EM ?? "Error", { closeOnClick: true });
    }
  };
  return (
    <div className="text-black">
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>{t("header.info.current-password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("header.info.current-password")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="12">
          <Form.Label>{t("header.info.new-password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("header.info.new-password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Button
        onClick={() => handleChangePassword()}
        type="secondary"
        className="w-30"
      >
        {t("header.info.change")}
      </Button>
    </div>
  );
};
export default Password;
