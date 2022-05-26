import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "views/GS/Dashboard";
import AssignTechOfficers from "views/GS/AssignTechOfficers";
import Laboratory from "views/GS/Laboratory";
import Persons from "views/GS/Person";
import GeneratedReports from "views/GS/GeneratedReports";
import Student from "views/GS/Student";
import TechnicalOfficer from "views/GS/TechnicalOfficer";
import AddType from "views/GS/AddEquipmentType";
import changePass from "views/GS/ChangePass";
import {Lock,Domain,GroupAdd,AccountCircle,ReportProblem} from '@material-ui/icons';
import {Add, Password} from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';

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
    path: "/technicalofficer",
    name: "TechnicalOfficer",
    icon: Person,
    component: TechnicalOfficer,
    layout: "/gs",
  },
  {
    path: "/student",
    name: "Student",
    icon: Person,
    component: Student,
    layout: "/gs",
  },
  {
    path: "/aasignTechOfficers",
    name: "AssignTechOfficers",
    icon:GroupAdd,
    component: AssignTechOfficers,
    layout: "/gs",
  },
  {
    path: "/laboratories",
    name: "Laboratories",
    icon: Domain,
    component: Laboratory,
    layout: "/gs",
  },
  {
    path: "/addEquipmentType",
    name: "Add EquipmentType",
    icon: Add,
    component: AddType,
    layout: "/gs",
  },
 
  {
    path: "/generatedReport",
    name: "Report Summary",
    icon: AssessmentIcon,
    component: GeneratedReports,
    layout: "/gs",
  },

  {
    path: "/changePass",
    name: "Change Password",
    icon: Password,
    component: changePass,
    layout: "/gs",
  }
];

export default dashboardRoutes;

