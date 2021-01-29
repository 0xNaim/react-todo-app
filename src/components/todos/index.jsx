import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import shortid from "shortid";
import Controller from "../controllers";
import CreateTodoForm from "../create-todo-form";
import ListView from "../list-view";
import TableView from "../table-view";

class Todos extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        text: "main todo text",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
      {
        id: 2,
        text: "main another",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
      {
        id: 3,
        text: "new task",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
    ],
    isOpenTodoForm: false,
    searchTask: "",
    view: "list",
  };

  toggleSelect = (todoId) => {
    const todos = [...this.state.todos];
    const todo = todos.find((todo) => todo.id === todoId);
    todo.isSelect = !todo.isSelect;

    this.setState({ todos });
  };

  toggleComplete = (todoId) => {
    const todos = [...this.state.todos];
    const todo = todos.find((todo) => todo.id === todoId);
    todo.isComplete = !todo.isComplete;

    this.setState({ todos });
  };

  toggleForm = () => {
    this.setState({
      isOpenTodoForm: !this.state.isOpenTodoForm,
    });
  };

  handleSearch = (value) => {
    this.setState({ searchTask: value });
  };

  createTodo = (todo) => {
    todo.id = shortid.generate();
    todo.time = new Date();
    todo.isComplete = false;
    todo.isSelect = false;

    const todos = [todo, ...this.state.todos];
    this.setState({ todos });
    this.toggleForm();
  };

  handleFilter = () => {};

  changeView = (event) => {
    this.setState({
      view: event.target.value,
    });
  };

  clearSelected = () => {};

  clearCompleted = () => {};

  reset = () => {};

  performSearch = () => {
    return this.state.todos.filter((todo) =>
      todo.text.toLowerCase().includes(this.state.searchTask.toLowerCase())
    );
  };

  getView = () => {
    let todos = this.performSearch();
    return this.state.view === "list" ? (
      <ListView
        todos={todos}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
    ) : (
      <TableView
        todos={todos}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
    );
  };

  render() {
    return (
      <div>
        <h1 className="display-4 text-center mb-5">Stack Todos</h1>
        <Controller
          task={this.state.searchTask}
          toggleForm={this.toggleForm}
          handleSearch={this.handleSearch}
          view={this.state.view}
          handleFilter={this.handleFilter}
          changeView={this.changeView}
          clearSelected={this.clearSelected}
          clearCompleted={this.clearCompleted}
          reset={this.reset}
        />
        <div>{this.getView()}</div>
        <Modal isOpen={this.state.isOpenTodoForm} toggle={this.toggleForm}>
          <ModalHeader toggle={this.toggleForm}>
            Create New Todo Item
          </ModalHeader>
          <ModalBody>
            <CreateTodoForm createTodo={this.createTodo} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Todos;
