import "../App.css";
import {
  Checkbox,
  Tooltip,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  NativeSelect,
  InputLabel,
  Button,
  Chip,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import todoLogo from "./../todoLogo.png";
function Todo() {
  const [todos, setTodos] = useState(() => {
    const localStorageTodos = localStorage.getItem("todos");
    if (localStorageTodos) {
      return JSON.parse(localStorageTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [checkMark, setCheckMark] = useState("");
  const [todolabel, setLabel] = useState("");
  const [todoId, setTodoId] = useState("");
  const useStyles = makeStyles((theme) => ({
    list: {
      maxWidth: "600px",
      margin: "20px auto",
      backgroundColor: "aliceblue",
      borderRadius: "8px",
      boxShadow: "2px 2px 2px 2px aliceblue",
      overflowY: "auto",
    },
    mainBody: {
      paddingTop: "150px",
      paddingBottom: "20px",
    },

    updateLabel: {
      display: "flex",
      maxWidth: "500px",
      margin: "20px auto",
      gap: "5px",
    },
    selectLabel: {
      fontSize: "15px",
      position: "relative",
      top: "7px",
      color: "#3f51b5",
    },
    logo: {
      width: "70px",
      height: "70px",
    },
    todoHead: {
      backgroundColor: "#3f51b5",
      display: "flex",
      color: "#7cddf8",
      width: "100%",
      position: "fixed",
      top: "0px",
      zIndex: "1",
      boxShadow: "8px 2px 3px 1px #282c34bb",
    },
    todo: {
      position: "relative",
      left: "20%",
    },
    inputFields: {
      padding: "20px",
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const submit = (e) => {
    let ctx = document.querySelector("#filled-basic");
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        {
          date: Date.now().toString(),
          text: todo.trim(),
          id: todos.length + 1,
          label: todolabel,
        },
      ]);
    }
    ctx.focus();
    setTodo("");
  };

  const updateLabel = () => {
    if (checkMark) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todoId) {
          todos[i].label = todolabel;
        }
      }
      setTodos([...todos]);
    }
  };

  const deleteTodo = (id) => {
    let items = todos;
    items.splice(id, 1);
    setTodos([...items]);
  };

  return (
    <div className={classes.mainBody}>
      <div className={classes.todoHead}>
        <img className={classes.logo} src={todoLogo} alt="Logo" />
        <h3>TODOS</h3>
      </div>
      <div classes={classes.todo}>
        <div className={classes.inputFields}>
          <form>
            <TextField
              id="filled-basic"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              variant="filled"
              placeholder="Study,read,etc"
              autoFocus
            />

            <Tooltip onClick={submit} title="Add" aria-label="add">
              <Fab color="primary">
                <AddIcon />
              </Fab>
            </Tooltip>
          </form>
          <div className={classes.updateLabel}>
            <InputLabel
              className={classes.selectLabel}
              htmlFor="demo-customized-select-native"
            >
              Select Label
            </InputLabel>
            <NativeSelect
              onChange={(e) => setLabel(e.target.value)}
              id="demo-customized-select-native"
            >
              <option aria-label="None" value="">
                None
              </option>
              <option value={"Urgent"}>Urgent</option>
              <option value={"Can be done later"}>Can be done later</option>
              <option value={"Complete in general"}>Complete in general</option>
              <option value={"Important but not necessary"}>
                Important but not necessary
              </option>
            </NativeSelect>
            <Button
              color="primary"
              onClick={() => updateLabel()}
              variant="contained"
            >
              Update
            </Button>
          </div>
        </div>
        {todos ? (
          <List className={classes.list}>
            {todos.map((value, id) => {
              const labelId = `checkbox-list-label-${value}`;
              const date = new Date(parseInt(value.date));
              const formattedDate = date.toString().slice(3, 10);
              return (
                <ListItem key={value.id} dense button>
                  <ListItemIcon>
                    <Checkbox
                      color="primary"
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      onChange={(e) => setCheckMark(e.target.checked)}
                      onClick={() => setTodoId(value.id)}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.todoListItems}
                    id={labelId}
                    primary={`${value.text}`}
                    secondary={`${formattedDate}`}
                  />

                  {value.label ? (
                    <Chip
                      id="chip"
                      variant={value.label ? "outlined" : "default"}
                      size="small"
                      label={value.label}
                      className={classes.MuiChip}
                      color={
                        value.label === "Complete in general"
                          ? "primary"
                          : value.label === "Urgent"
                          ? "secondary"
                          : value.label === "Important but not necessary"
                          ? "default"
                          : "default"
                      }
                    />
                  ) : (
                    ""
                  )}
                  {/* <Divider /> */}
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <DeleteIcon onClick={() => deleteTodo(id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Todo;
