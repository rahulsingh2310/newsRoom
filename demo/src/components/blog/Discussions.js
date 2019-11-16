import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  Progress
} from "shards-react";

const Discussions = ({ title, discussions }) => (
  <Card small className="blog-comments sticky-top" style={{top:"289px",zIndex:"-1"}}>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      {discussions.map((discussion, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">
          {/* Avatar */}

          <div className="blog-comments__avatar mr-3">
            <img src={discussion.author.image} alt={discussion.author.name} />
          </div>

          {/* Content */}
          <div className="w-50 mr-1">
            {/* Content :: Title */}
            <a className="text-secondary" href={discussion.author.url}>
              {discussion.author.name}
            </a>
            <Progress
        theme="success"
        style={{ height: "6px",width:"75%" }}
        className="mb-3"
        value={discussion.author.trustfactor}
      />


            </div>

            <div>

            <Button pill > <i class="material-icons">person</i>Follow</Button>


            </div>

</div>
      ))}
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

Discussions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array
};

Discussions.defaultProps = {
  title: "People You May Know",
  discussions: [
    {
      id: 1,
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "Ranjan",
        url: "#",
        trustfactor:65
      }
    },
    {
      id: 2,

      author: {
        image: require("../../images/avatars/2.jpg"),
        name: "Vaibhav",
        url: "#",
        trustfactor:75
      }
    },
    {
      id: 3,

      author: {
        image: require("../../images/avatars/3.jpg"),
        name: "Ravish",
        url: "#",
        trustfactor:60
      }
    },
    {
      id: 4,
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "Piyush",
        url: "#",
        trustfactor:85
      }
    },
    {
      id: 5,
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "Aditya",
        url: "#",
        trustfactor:45
      }
    }

  ]
};

export default Discussions;
