import Person from "@material-ui/icons/Person";
import Pharmacy from "views/GS/Pharmacy";
import Persons from "views/GS/Person";
import Vaccination from "views/GS/VaccinationDetail";
import CovidStatus from "views/GS/CovidStatus";
import GroceryStore from "views/GS/GroceryStore";
import {GroupAdd} from '@material-ui/icons';
import DashboardPage from "views/GS/Dashboard";
import Dashboard from "@material-ui/icons/Dashboard";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/gs",
  },
  {
    path: "/person",
    name: "Person",
    icon: Person,
    component: Persons,
    layout: "/gs",
  },
  {
    path: "/covid19",
    name: "Covid19 Status",
    icon: Person,
    component: CovidStatus,
    layout: "/gs",
  },
  {
    path: "/vaccination",
    name: "Vaccination Detail",
    icon: Person,
    component: Vaccination,
    layout: "/gs",
  },
  {
    path: "/pharmacy",
    name: "Pharmacy",
    icon:GroupAdd,
    component: Pharmacy,
    layout: "/gs",
  },
  {
    path: "/grocery",
    name: "Grocery Store",
    icon: GroupAdd,
    component: GroceryStore,
    layout: "/gs",
  }
];

export default dashboardRoutes;

