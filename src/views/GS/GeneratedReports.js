import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
	exportComponentAsPDF,
	exportComponentAsJPEG,
} from "react-component-export-image";


import { makeStyles } from "@material-ui/core/styles";

import Store from "@material-ui/icons/Store";

import DescriptionIcon from "@material-ui/icons/Description";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { People } from "@material-ui/icons";
import { useReactToPrint } from "react-to-print";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useEffect,useState } from "react";

const useStyles = makeStyles(styles);
var today = new Date(),
	date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

function Dashboard() {
	const classes = useStyles();

	//   const ComponentToPrint = React.forwardRef((props, ref) => (
	//     // <Barcode ref={ref} value={props.value} />
	//    <div ref={ref}>
	//       <Barcode ref={ref} value={props.value} />
	//    </div>
	//   ));
	const [userStats,setUserStats]=useState();
	const [requestStats,setRequestStats]=useState();
	const [equipStats,setEquipStats]=useState({});

	useEffect(()=>{
		fetch(process.env.REACT_APP_API+'/admin/getUserStats',{credentials:'include'})
		 .then(response =>{
			if (response.status==200)return new Promise((resolve)=>{resolve(response.json())});
			else alert("Service Unavailable")
		  } )
		.then(data=>{
			// console.log("HI")
		  setUserStats(data.msg);
		})
		.catch(e=>console.log(e));

		fetch(process.env.REACT_APP_API+'/admin/getRequestStats',{credentials:'include'})
		 .then(response =>{
			if (response.status==200)return new Promise((resolve)=>{resolve(response.json())});
			else alert("Service Unavailable")
		 })
		.then(data=>{
			// console.log(data)
		  setRequestStats(data.msg);
		})
		.catch(e=>console.log(e));

		fetch(process.env.REACT_APP_API+'/admin/getEquipStats',{credentials:'include'})
		 .then(response =>{
			if (response.status==200)return new Promise((resolve)=>{resolve(response.json())});
			else alert("Service Unavailable")
		 })
		.then(data=>{
			// console.log(data)
		  setEquipStats(data.msg);
		})
		.catch(e=>console.log(e));
	  },[]);
	  if(equipStats[0])console.log(equipStats[0].count)
	  console.log(equipStats);
	  console.log(userStats);
	  console.log(requestStats);
	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Equipment Details</h4>
							<p className={classes.cardCategoryWhite}>Details as of {date}</p>
						</CardHeader>
						<CardBody>
							<Bar
								data={{
									labels: [
										"Available",
										"Requested",
										"temporary Borrowed",
										"borrowed",
										"not-usable",
										"removed",
									],
									datasets: [
										{
											label: "# of Equipments",
											// data:[1,2,3,4,5,6],
											data: [equipStats[0]==undefined ? "" : equipStats[0].count,equipStats[1]==undefined ? "" :equipStats[1].count,equipStats[2]==undefined ? "" :equipStats[2].count,equipStats[3]==undefined ? "" :equipStats[3].count,equipStats[4]==undefined ? "" :equipStats[4].count,equipStats[5]==undefined ? "" :equipStats[5].count],
											backgroundColor: [
												"rgba(255, 99, 132, 0.2)",
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
												"rgba(75, 192, 192, 0.2)",
												"rgba(153, 102, 255, 0.2)",
												"rgba(255, 159, 64, 0.2)",
											],
											borderColor: [
												"rgba(255, 99, 132, 1)",
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
												"rgba(75, 192, 192, 1)",
												"rgba(153, 102, 255, 1)",
												"rgba(255, 159, 64, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={100}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Equipment Details</h4>
							<p className={classes.cardCategoryWhite}>Details as of {date}</p>
						</CardHeader>
						<CardBody>
							<Pie
								data={{
									labels: [
										"Available",
										"Requested",
										"temporary Borrowed",
										"borrowed",
										"not-usable",
										"removed",
									],
									datasets: [
										{
											label: "# of Votes",
											data: [equipStats[0]==undefined ? "" : equipStats[0].count,equipStats[1]==undefined ? "" :equipStats[1].count,equipStats[2]==undefined ? "" :equipStats[2].count,equipStats[3]==undefined ? "" :equipStats[3].count,equipStats[4]==undefined ? "" :equipStats[4].count,equipStats[5]==undefined ? "" :equipStats[5].count],
											backgroundColor: [
												"rgba(255, 99, 132, 0.2)",
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
												"rgba(75, 192, 192, 0.2)",
												"rgba(153, 102, 255, 0.2)",
												"rgba(255, 159, 64, 0.2)",
											],
											borderColor: [
												"rgba(255, 99, 132, 1)",
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
												"rgba(75, 192, 192, 1)",
												"rgba(153, 102, 255, 1)",
												"rgba(255, 159, 64, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={60}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<Card>
					<CardBody>
						<Stack sx={{ width: "100%" }} spacing={2}>
							<Alert style={{ background: "rgba(255, 99, 132, 0.2)" }}>
								<AlertTitle> Avaialble Equipments {equipStats[0]==undefined ? "" : equipStats[0].count}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(54, 162, 235, 0.2)" }}>
								<AlertTitle> Requested Equipments {equipStats[1]==undefined ? "" : equipStats[1].count}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(255, 206, 86, 0.2)" }}>
								<AlertTitle> Temporarily Borrowed Equipments {equipStats[2]==undefined ? "" : equipStats[2].count}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(75, 192, 192, 0.2)" }}>
								<AlertTitle> Borrowed Equipments {equipStats[3]==undefined ? "" : equipStats[3].count}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(153, 102, 255, 0.2)" }}>
								<AlertTitle> Not usable Equipments {equipStats[4]==undefined ? "" : equipStats[4].count}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(255, 159, 64, 0.2)" }}>
								<AlertTitle> Removed Equipments {equipStats[5]==undefined ? "" : equipStats[5].count}</AlertTitle>
							</Alert>
						</Stack>
					</CardBody>
				</Card>
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Student Requests</h4>
							<p className={classes.cardCategoryWhite}>Requests as of {date}</p>
						</CardHeader>
						<CardBody>
							<Bar
								data={{
									labels: ["Pending", "Approved", "Rejected"],
									datasets: [
										{
											label: "# of Requests",
											data: [requestStats ? requestStats.pending : 0,requestStats ? requestStats.accepted : 0,requestStats ? requestStats.rejected : 0],
											backgroundColor: [
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
												"rgba(75, 192, 192, 0.2)",
											],
											borderColor: [
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
												"rgba(75, 192, 192, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={100}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Student Requests</h4>
							<p className={classes.cardCategoryWhite}>Requests as of {date}</p>
						</CardHeader>
						<CardBody>
							<Pie
								data={{
									labels: ["Pending", "Approved", "Rejected"],
									datasets: [
										{
											label: "# of Votes",
											data: [requestStats ? requestStats.pending : 0,requestStats ? requestStats.accepted : 0,requestStats ? requestStats.rejected : 0],
											backgroundColor: [
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
												"rgba(75, 192, 192, 0.2)",
											],
											borderColor: [
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
												"rgba(75, 192, 192, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={60}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<Card>
					<CardBody>
						<Stack sx={{ width: "100%" }} spacing={2}>
							<Alert style={{ background: "rgba(54, 162, 235, 0.2)" }}>
								<AlertTitle> Pending student requests {requestStats ? requestStats.pending:0}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(255, 206, 86, 0.2)" }}>
								<AlertTitle> Approved Student requests {requestStats ? requestStats.accepted:0}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(75, 192, 192, 0.2)" }}>
								<AlertTitle> Rejected student requests {requestStats ? requestStats.rejected:0}</AlertTitle>
							</Alert>
						</Stack>
					</CardBody>
				</Card>
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>User Stats</h4>
							<p className={classes.cardCategoryWhite}>
								User stats as of {date}
							</p>
						</CardHeader>
						<CardBody>
							<Bar
								data={{
									labels: ["Lecturers", "Tech Officers", "Students"],
									datasets: [
										{
											label: "# of Counts",
											data: [userStats ? userStats.lecturer : 0,userStats ? userStats.technicalOfficer : 0,userStats ? userStats.student : 0],
											backgroundColor: [
												"rgba(255, 99, 132, 0.2)",
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
											],
											borderColor: [
												"rgba(255, 99, 132, 1)",
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={100}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={6}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>User stats</h4>
							<p className={classes.cardCategoryWhite}>
								user stats as of {date}
							</p>
						</CardHeader>
						<CardBody>
							<Pie
								data={{
									labels: ["Lecturers", "Tech Officers", "Students"],
									datasets: [
										{
											label: "# of Votes",
											data: [userStats ? userStats.lecturer : 0,userStats ? userStats.technicalOfficer : 0,userStats ? userStats.student : 0],
											backgroundColor: [
												"rgba(255, 99, 132, 0.2)",
												"rgba(54, 162, 235, 0.2)",
												"rgba(255, 206, 86, 0.2)",
											],
											borderColor: [
												"rgba(255, 99, 132, 1)",
												"rgba(54, 162, 235, 1)",
												"rgba(255, 206, 86, 1)",
											],
											borderWidth: 1,
										},
									],
								}}
								width={100}
								height={60}
								options={{
									maintainAspectRatio: true,
									scales: {
										y: {
											beginAtZero: true,
										},
									},
								}}
							/>
						</CardBody>
					</Card>
				</GridItem>
				<Card>
					<CardBody>
						<Stack sx={{ width: "100%" }} spacing={2}>
							<Alert style={{ background: "rgba(255, 99, 132, 0.2)" }}>
								<AlertTitle> Lecturers {userStats ? userStats.lecturer : 0}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(54, 162, 235, 0.2)" }}>
								<AlertTitle> Technical Officers {userStats ? userStats.technicalOfficer : 0}</AlertTitle>
							</Alert>
							<Alert style={{ background: "rgba(255, 206, 86, 0.2)" }}>
								<AlertTitle> Students {userStats ? userStats.student : 0}</AlertTitle>
							</Alert>
						</Stack>
					</CardBody>
				</Card>
			</GridContainer>
		</div>
	);
}

export default function exporting() {
	const componentRef = React.useRef();
	const ComponentToPrint = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<Dashboard />
		</div>
	));
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div>
			<ComponentToPrint ref={componentRef} />
			<button onClick={handlePrint}>Export As PDF</button>
		</div>
	);
}
