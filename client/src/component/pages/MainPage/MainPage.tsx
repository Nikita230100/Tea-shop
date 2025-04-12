import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../shared/lib/axiosInstance";
import { Row, Col } from "react-bootstrap";
import TeaCard from "../../ui/TeaCard/TeaCards";
// import { useAuth } from "../../context/AuthContext"; // Предполагается, что у вас есть контекст аутентификации

export default function MainPage({user}) {
  const [teas, setTeas] = useState([]);
  

  const teasAll = async () => {
    try {
      const { data } = await axiosInstance('/teas');
      setTeas(data);
    } catch (error) {
      console.log('Ошибка получения всех чаев', error);
    }
  };

  useEffect(() => {
    teasAll();
  }, []);

  return (
    <>
    <br/>
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {teas.map((el) => (
        <Col xs={12} md={6} lg={4} key={el.id}>
          <TeaCard setTeas={setTeas} tea={el} user={user} />
        </Col>
      ))}
    </Row>
    </>
  );
}
