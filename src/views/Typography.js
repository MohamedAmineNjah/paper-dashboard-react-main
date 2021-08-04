
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function Typography() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Paper Table Heading</h5>
                <p className="category">Created using Montserrat Font Family</p>
              </CardHeader>
              
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Typography;
