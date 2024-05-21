import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

const initialValues = { task: "", todo: [] };

function TodoList() {
  const [values, setValues] = useState(initialValues);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState({ status: false, id: "" });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, task: e.target.value }));
  };

  const handleAdd = () => {
    if (update.status) {
      const temp = [];
      values.todo.forEach((obj) => {
        const tempObj = { ...obj };
        if (tempObj.id === update.id) {
          tempObj.task = values.task;
        }
        temp.push(tempObj);
      });

      setValues((prev) => ({ ...prev, task: "", todo: temp }));
      setUpdate((prev) => ({ ...prev, status: false, id: "" }));
    } else {
      const temp = values.todo;
      temp.push({ id: count + 1, task: values.task });
      setCount(count + 1);
      setValues((prev) => ({ ...prev, task: "", todo: temp }));
    }
  };

  const handleEdit = (id, task) => {
    setUpdate((prev) => ({ ...prev, status: true, id: id }));
    setValues((prev) => ({ ...prev, task: task }));
  };

  const handleDelete = (id) => {
    const filterData = values.todo.filter((obj) => obj.id !== id);
    setValues((prev) => ({ ...prev, todo: filterData }));
  };

  console.log("values.todo", values.todo);
  console.log("count", count);

  const TodoContent = ({ index, data }) => {
    return (
      <>
        <Grid item xs={9} md={10}>
          <Typography
            variant="body2"
            textAlign="justify"
            color="textSecondary"
            sx={{ fontWeight: "bold" }}
          >
            {index + 1 + ". " + data.task}
          </Typography>
        </Grid>

        <Grid item xs={3} md={2}>
          <Stack direction="row" justifyContent="right">
            <IconButton
              onClick={() => handleEdit(data.id, data.task)}
              sx={{ padding: 0 }}
            >
              <EditNoteIcon sx={{ color: "#008DDA" }} />
            </IconButton>

            <IconButton
              onClick={() => handleDelete(data.id)}
              sx={{ padding: 0 }}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </>
    );
  };

  return (
    <Box m={{ md: 5, xs: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardHeader
              title="ToDo's"
              sx={{
                backgroundColor: "#6196A6",
                color: "white",
                fontWeight: "bold",
              }}
            />
            <CardContent sx={{ padding: 4 }}>
              <Grid container columnSpacing={2} rowSpacing={{ md: 2, xs: 1 }}>
                <Grid item xs={12} md={10}>
                  <TextField
                    value={values.task}
                    onChange={(e) => handleChange(e)}
                    size="small"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={2} mb={2} align="right">
                  <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={values.task === ""}
                  >
                    {update.status ? "Update" : "Add"}
                  </Button>
                </Grid>

                {values.todo?.map((obj, i) => {
                  return <TodoContent key={i} index={i} data={obj} />;
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoList;
