import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

class CreateTodoForm extends Component {
  state = {
    text: "",
    description: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = this.validate();

    if (isValid) {
      this.props.createTodo(this.state);
      event.target.reset();
      this.setState({ text: "", description: "" });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { text, description } = this.state;
    if (!text) {
      errors.text = "Please provide task name";
    }
    if (!description) {
      errors.description = "Please provide task description";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Task Name</Label>
          <Input
            className={
              this.state.errors.text
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Create your task"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          {this.state.errors.text && (
            <div className="invalid-feedback">{this.state.errors.text}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Describe Task</Label>
          <Input
            className={
              this.state.errors.description
                ? "form-control is-invalid"
                : "form-control"
            }
            type="textarea"
            placeholder="Describe your task"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          {this.state.errors.description && (
            <div className="invalid-feedback">
              {this.state.errors.description}
            </div>
          )}
        </FormGroup>
        <Button type="submit">Create task</Button>
      </Form>
    );
  }
}

CreateTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default CreateTodoForm;
