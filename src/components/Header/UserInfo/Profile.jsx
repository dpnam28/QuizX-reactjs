import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { postUpdateProfile } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [username, setUsername] = useState("1");
  const [email, setEmail] = useState("1");
  const [role, setRole] = useState("User");
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
  const account = useSelector((state) => state.user.account);
  const { t } = useTranslation();

  useEffect(() => {
    if (_.isEmpty(account)) return;

    setUsername(account?.username ?? "");
    setEmail(account?.email ?? "");
    setPreviewImg(
      account.image ? `data:image/jpeg;base64,${account.image}` : ""
    );
    setRole(account?.role ?? "");
    changeBase64ToFile();
  }, []);

  const handleChangeImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const changeBase64ToFile = async () => {
    let tmp = await urlToFile(
      `data:image/png;base64,${account.image}`,
      `${account.username}image.png`,
      "image/png"
    );
    setImage(tmp);
  };

  async function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const handleUpdateProfile = async () => {
    if (!username) {
      toast.warn("Missing parameter", { closeOnClick: true });
    }

    let res = await postUpdateProfile(username, image);
    if (res?.EC === 0) {
      toast.success(res?.EM + " log in again to update" ?? "succeeded", {
        closeOnClick: true,
      });
    } else {
      toast.warn(res?.EM ?? "Error", { closeOnClick: true });
    }
  };
  return (
    <div className="text-black">
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>{t("header.info.email")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("header.info.email")}
            value={email}
            disabled
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>{t("header.info.username")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("header.info.username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="12">
          <Form.Label>{t("header.info.role")}</Form.Label>
          <Form.Select value={role} disabled>
            <option value="USER">{t("header.info.user")}</option>
            <option value="ADMIN">{t("header.info.admin")}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="position-relative mt-3">
          <Form.Label
            htmlFor="file"
            className="cursor-pointer border border-black rounded-lg pb-1 px-2 border-dashed"
          >
            <span className="text-xl font-black">+</span>{" "}
            {t("header.info.choose-image")}
          </Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            id="file"
            onChange={(e) => handleChangeImage(e)}
            hidden
          />
        </Form.Group>
        {previewImg && (
          <div
            className={`w-[70%] border border-dotted h-50 m-auto bg-contain bg-no-repeat bg-center mt-5`}
            style={{ background: `url(${previewImg})` }}
          ></div>
        )}
      </Row>
      <Button
        onClick={() => handleUpdateProfile()}
        type="secondary"
        className="w-30"
      >
        {t("header.info.update")}
      </Button>
    </div>
  );
};
export default Profile;
