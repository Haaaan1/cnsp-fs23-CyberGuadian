import React, { useEffect, useState } from 'react';
import { userLogin } from '../../api/authenticationService';
import { useNavigate } from 'react-router-dom';
import { authenticate, authFailure, authSuccess, authLogout } from '../../redux/authActions';
import { useDispatch, useSelector } from 'react-redux'
import './login.css';


const Login = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    });


    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(authenticate());
        userLogin(loginData).then((response) => {
            if (response.status === 200) {
                dispatch(authSuccess(response.data));
                history('/home')
            }
            else {
                dispatch(authFailure('Something Wrong!Please Try Again'));
            }
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        dispatch(authFailure("Authentication Failed.Bad Credentials"));
                        break;
                    default:
                        dispatch(authFailure('Something Wrong!Please Try Again'));
                }
            }
            else {
                dispatch(authFailure('Something Wrong!Please Try Again'));
            }
        });
        //console.log("Loading again",loading);

    }
    const handleChange = (e) => {
        e.persist();
        setLoginData(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };
    const logOut = () => {
        localStorage.clear();
        dispatch(authLogout());
        history('/');
    }

    useEffect(() => {
        logOut();
    }, []);

    return (

        <form className=" gx-3 gy-2 align-items-center w-100 p-3" onSubmit={handleSubmit} noValidate={false}>

            <div className="col-sm-3 mt-3">
                <div className="input-group">
                    <div className="input-group-text">Username</div>
                    <input type="text" className="form-control" id="userName" name='userName' value={loginData.userName} onChange={handleChange} placeholder="Username" />
                </div>
            </div>
            <div className="col-sm-3 mt-3">
                <div className="input-group">
                    <div className="input-group-text">Password&nbsp;</div>
                    <input type="password" className="form-control" id="password" name='password' value={loginData.password} onChange={handleChange} placeholder="Password" />
                </div>
            </div>
            {/* <div className="col-sm-3">
                <select className="form-select" id="specificSizeSelect">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div> */}
            {/* <div className="col-auto">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="autoSizingCheck2" />
                    <label className="form-check-label" for="autoSizingCheck2">
                        Are You Admin
                    </label>
                </div>
            </div> */}
            <div className="col-auto mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
                {state.loading && (
                    <span className="ms-2 fw-bold">Loading...</span>
                )}

            </div>

        </form>

    );
}

export default Login;