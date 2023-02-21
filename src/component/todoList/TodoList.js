import React, { useState } from "react";
import style from "./todoList.module.css";
import Button from "../../commanComponent/button/Button";
const TodoList = () => {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  const [list, setList] = useState(todoList ? todoList : []);
  const [title, setTitle] = useState("");
  const addTitle = () => {
    if (title) {
      let newList = list;
      newList.push({ title: title, compalition: false, titleTogle: true });
      setList([...newList]);
      setTitle("");
      saveLocalStorage(newList);
    }
  };
  const doubleHandle = (index) => {
    let data = list;
    data[index].titleTogle = !data[index].titleTogle;
    saveLocalStorage(data);
    setList([...data]);
    return;
  };
  const saveLocalStorage = (data) => {
    localStorage.setItem("todoList", JSON.stringify(data));
  };
  const clearData = () => {
    setList([]);
    localStorage.clear("todoList");
  };
  return (
    <div className={style.container}>
      <div className={style.todo_container}>
        <div className={style.heading}>Todo List</div>
        <label className={style.title_lable}>Title</label>
        <div className={style.inputbox}>
          <div>
            <input
              type="text"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Button type="add" onClick={(e) => addTitle(e)}>
              Add
            </Button>
          </div>
        </div>

        <div className={style.list}>
          <div className={style.list_header}>
            <div>Title</div>
            <div>Completion Status</div>
          </div>
          <div className={style.list_cantainer}>
            {list?.map((e, index) => {
              return (
                <div className={style.list_data} key={index}>
                  {e?.titleTogle ? (
                    <span
                      className={style.title}
                      onDoubleClick={() => doubleHandle(index)}
                    >
                      {e.title}
                    </span>
                  ) : (
                    <div className={style.edit_title}>
                      <input
                        type="text"
                        placeholder="Edit Title"
                        value={e.title}
                        onBlur={() => {
                          let data = list;
                          data[index].titleTogle = !data[index].titleTogle;
                          saveLocalStorage(data);
                          setList([...data]);
                        }}
                        onChange={(e) => {
                          let data = list;
                          data[index].title = e.target.value;
                          saveLocalStorage(data);
                          setList([...data]);
                        }}
                      />
                    </div>
                  )}

                  <input
                    type="checkbox"
                    id={`status${index}`}
                    className={style.vh}
                    checked={e.compalition}
                    onChange={() => {
                      let data = list;
                      data[index].compalition = !data[index].compalition;
                      saveLocalStorage(data);
                      setList([...data]);
                    }}
                  />
                  <label
                    htmlFor={`status${index}`}
                    style={{
                      color: "black",
                      marginRight: "1rem",
                    }}
                    className={style.label}
                  >
                    Completed
                  </label>
                </div>
              );
            })}
          </div>
          {list?.length > 0 && (
            <div className={style.btn_clear}>
              <Button type="clear" onClick={() => clearData()}>
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
