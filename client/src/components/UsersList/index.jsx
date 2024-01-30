import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link, Router, Switch, Route } from 'react-router-dom';
import styles from './UsersList.module.sass';
import defImage from './defaultPhoto.jpg';
import { useEffect, useState } from 'react';
import {
  deleteUserThunk,
  getUserTasksThunk,
  getUsersThunk,
} from '../../store/slices/usersSlice';

import UserProfile from '../../pages/UserPage';

export const UsersList = ({
  users,
  userTasks,
  isFetching,
  error,
  getUsers,
  deleteUser,
  getUsersTask,
}) => {
  //const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log(userTasks);
    getUsersTask();
    getUsers();
    //console.log(users)
    // fetch('http://localhost:5000/api/users')
    //   .then(res => res.json())
    //   .then(data => setUsers(data.data))
    //   .catch(err => console.log(err))
    //getUsersTask();
  }, []);
  const usersWithTasks = users.map(u => ({
    ...u,
    ...userTasks.find(t => t.userId === u.id),
  }));
  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {usersWithTasks.map(u => (
          <li key={u.id}>
            <button
              onClick={() => {
                deleteUser(u.id);
              }}
            >
              X
            </button>
            <img
              className={styles.userImage}
              src={
                u.image ? `http://localhost:5000/images/${u.image}` : defImage
              }
              alt={`${u.firstName}${u.lastName}`}
            />
            <p>{JSON.stringify(u)}</p>
              <Link to={{ pathname: `/users/${u.id}`, state: { user: u }}}>Go To Profile</Link>
          </li>
        ))}
        {}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData, usersTaskData }) => ({
  ...usersData,
  usersTaskData,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersThunk()),
  deleteUser: id => dispatch(deleteUserThunk(id)),
  getUsersTask: () => dispatch(getUserTasksThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
