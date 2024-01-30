import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import defImage from '../../components/UsersList/defaultPhoto.jpg';
import styles from './UserProfile.module.scss';
import { useEffect, useState } from 'react';
import { getUserTasksThunk } from '../../store/slices/usersTaskSlice';


function UserProfile({
  getUsersTask,
  usersTask
}) {
  const location = useLocation();
  const { user } = location.state;
  // const { user } = location.state;
  
  const { id } = useParams();

  useEffect(() => {
    console.log(usersTask);
    //getUsersTask()
    // *************** method 1
    // fetch(`http://localhost:5000/api/users/${user.id}/tasks`)
    //   .then(res => res.json())
    //   .then(data => data)

      //console.log(getUsersTask())
  }, []);
  return (
    <div className={styles.profileCard}>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>User email: - {user.email}</p>
      <img src={ user.image ? `http://localhost:5000/images/${user.image}` : defImage} alt={user.firstName} />
      <p>{user.birthday}</p>
      <div>
        <p>Task body: {user.body}</p>
        <p>Deadline: {user.deadline}</p>
      </div>
    </div>
  )
}

const mapStateToProps = ({ usersTaskData }) => usersTaskData;

const mapDispatchToProps = dispatch => ({
  getUsersTask: () => dispatch(getUserTasksThunk()),
  //deleteUser: id => dispatch(deleteUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps) (UserProfile);