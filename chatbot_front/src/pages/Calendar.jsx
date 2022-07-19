import React, { useEffect } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { Button } from "@material-ui/core";
import * as api from "../api/index";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Calendar = () => {
  const { planing, setPlaning } = useStateContext();
  const user = JSON.parse(localStorage.getItem("profile"));
  const updatePlaning = async (data) => {
    const { id, planing } = data;
    try {
      setPlaning(await api.updatePlaning(id, planing));
      let modifiedPlaning = planing;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setPlaning(await api.getPlaning(user.result.email));
      };
      fetchData();
      console.log(planing);
    }
  }, []);
  let modifiedPlaning = planing;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          updatePlaning({ id: user.result.email, planing: modifiedPlaning });
        }}
      >
        Save
      </Button>
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: modifiedPlaning }}
      >
        <Inject
          services={[Day, Week, Month, WorkWeek, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
