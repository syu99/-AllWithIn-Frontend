import styles from "../styles/Lobby.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { addProject } from "../reducers/project";
import Button from "../components/Button";

function Lobby() {
  const project = useSelector((state) => state.project.value);

  //user reducer
  const user = useSelector((state) => state.user.value);
  console.log(user);
  //hook for user's projects
  const [dataProjects, setDataProjects] = useState([]);

  const [selectProject, setSelectProject] = useState({});
  const [freelanceProject, setFreelanceProject] = useState(null);
  const [switcher, setSwitcher] = useState(true);
  const dispatch = useDispatch();
  console.log("filter", freelanceProject);

  // useEffect allowing to connect to the backend to retrieve the projects related to the person connected to the component loading
  useEffect(() => {
    console.log("yo");
    fetch(`https://all-with-in-backend.vercel.app/projects/token/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setDataProjects(data.projects);
        if (data.projects.length !== 0) {
          setSelectProject(data.projects[0]);
        } else {
          setSelectProject({ name: "", description: "" });
        }
      });
    let userId;

    fetch(`https://all-with-in-backend.vercel.app/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        userId = data.userData._id;

        fetch(`https://all-with-in-backend.vercel.app/projects/freelanceProjects/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("hey", data);
            setFreelanceProject(data.freelanceProjects);
          });
      });
  }, []);

  //To upload to the store and find the project in the project dashboard page
  const sendProjectDasboard = (project) => {
    console.log(project);
    dispatch(addProject(project));
  };
  let projectData;
  if (switcher) {
    projectData = dataProjects.map((data, i) => {
      return (
        <div className={styles.projectButtonContainer}>
          <button
            key={i}
            onClick={() => showProject(data._id)}
            className={styles.projectButton}
          >
            {data.name}
          </button>
        </div>
      );
    });

    function showProject(idProject) {
      setSelectProject(
        dataProjects[dataProjects.findIndex((data) => data._id === idProject)]
      );
    }
  } else {
    projectData = freelanceProject.map((data, i) => {
      return (
        <div className={styles.projectButtonContainer}>
          <button
            key={i}
            onClick={() => showProject(data._id)}
            className={styles.projectButton}
          >
            {data.name}
          </button>
        </div>
      );
    });

    function showProject(idProject) {
      setSelectProject(
        freelanceProject[
          freelanceProject.findIndex((data) => data._id === idProject)
        ]
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.leftBody}>
          <div className={styles.topList}>
            <h2 className={styles.titleBody}>
              Your <span className={styles.span}>Projects</span>
            </h2>

            <div className={styles.projectList}>{projectData}</div>
            <div className={styles.switch}>
              {" "}
              <a onClick={() => setSwitcher(true)}>
                <Button
                  text="Project Manager"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#white"
                  borderColorHover="#white"
                  textColorHover="white"
                />
              </a>
              <a onClick={() => setSwitcher(false)}>
                <Button
                  text="Freelancer"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#white"
                  borderColorHover="#white"
                  textColorHover="white"
                />
              </a>{" "}
            </div>
          </div>
          <div className={styles.botList}>
            <Link href="/createProject">
              <button className={styles.actionProject}>
                Create a new project
              </button>
            </Link>
            <Link href="/join">
              <button className={styles.actionProject}>Join a project</button>
            </Link>
          </div>
        </div>
        <div className={styles.rightBody}>
          <div className={styles.infoProject}>
            <h2 className={styles.rightTitle}>{selectProject.name}</h2>
            <textarea
              className={styles.projectDescription}
              placeholder="Project description"
              value={selectProject.description}
            ></textarea>
            <Link href="/dashboard">
              <button
                onClick={() => sendProjectDasboard(selectProject)}
                className={styles.buttonDashboard}
              >
                GO TO DASHBOARD
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
