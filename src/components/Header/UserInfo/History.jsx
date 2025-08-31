import Table from "react-bootstrap/Table";
import { getHistory } from "../../../services/apiServices";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
const History = () => {
  const [arrHistory, setArrHistory] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res?.EC === 0) {
      let tmp = res.DT.data.slice(res.DT.data.length - 5, res.DT.data.length);
      tmp = _.orderBy(tmp, ["id"], ["desc"]);
      setArrHistory(tmp);
    }
  };
  return (
    <div className="text-black">
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("header.info.quiz-name")}</th>
            <th>{t("header.info.total-question")}</th>
            <th>{t("header.info.total-correct")}</th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(arrHistory) &&
            arrHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item?.quizHistory?.name ?? ""}</td>
                <td>{item?.total_questions ?? ""}</td>
                <td>{item?.total_correct ?? ""}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default History;
