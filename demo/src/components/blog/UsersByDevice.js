import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: "pie",
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Container>
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>

      </Card>
      </Container>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Trust Chart",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [78.3, 21.7],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Trusted News", "Fake News"]
  }
};

export default UsersByDevice;
