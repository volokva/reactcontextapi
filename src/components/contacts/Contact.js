import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Contacts extends Component {
  state = {
    showContactInfo: false,
    showContactInfoStyle: "fas fa-sort-down"
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      //because json placeholder dosent have newly created ids in real db it will throw error
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo, showContactInfoStyle } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  className={this.state.showContactInfoStyle}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                      showContactInfoStyle:
                        showContactInfoStyle === "fas fa-sort-down"
                          ? "fas fa-sort-up"
                          : "fas fa-sort-down"
                    })
                  }
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "#000",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contacts.propTypes = {
  contact: PropTypes.object.isRequired
};
