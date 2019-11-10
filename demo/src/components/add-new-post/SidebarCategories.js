import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";

const SidebarCategories = ({ title }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-2">
        <FormCheckbox className="mb-1" value="uncategorized" defaultChecked>
            Uncategorized
          </FormCheckbox>
          <FormCheckbox className="mb-1" value="politics" >
            Politics
          </FormCheckbox>
          <FormCheckbox className="mb-1" value="business" >
            Business
          </FormCheckbox>
          <FormCheckbox className="mb-1" value="technology">
            Technology
          </FormCheckbox>
          <FormCheckbox className="mb-1" value="sports">
            Sports
          </FormCheckbox>
        <FormCheckbox className="mb-1" value="entertainment">
            Entertainment
          </FormCheckbox>



        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  title: "Categories"
};

export default SidebarCategories;
