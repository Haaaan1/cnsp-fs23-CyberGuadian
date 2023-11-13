

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser';
import './login.css';


const Confirmation = () => {
    const state = useSelector((state) => state);
    const history = useNavigate();
    var secret = 0;
    var generatedSecret = 100000;

    const handleSecretChange = (e) => {
        e.persist();
        secret = e.target.value;
    };
    const back = () => {
        localStorage.clear();
        history('/');
    }

    const handle2FA = () => {
        const userData = JSON.parse(localStorage.getItem("UserData"));

        generatedSecret = generateSecret(); 

        var templateParams = {
            to_name: userData.firstName + ' ' + userData.lastName,
            reply_to: userData.email,
            message: generatedSecret
        };

        sendEmail(templateParams);
    }

    const sendEmail = (params) => {
        console.log('Sending Email...');
        emailjs.send('service_y0vmn8b', 'template_vtg0mkh', params, 'Je1MGCEOMRxFzpCy5')
        .then((result) => {
            return true;
        }, (error) => {
            console.log('error', error.text);
            return false;
        });
    };

    // Can be replaced for a better secret generation algorithm
    const generateSecret = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const verifyCode = (evt) => {
        evt.preventDefault();

        if(secret == 0) {
            alert("Please enter the code");
        }
        else if(secret != generatedSecret) {
            alert("Code is incorrect");
        }
        else {
            history('/home')
        }
    }

    return (
        <div style={{ minHeight: "80vh" }} className='col-8 mx-auto'>
            <button className='btn btn-warning ms-3 my-3' onClick={back} >Back</button>
            <button className='btn btn-warning ms-3 my-3' onClick={handle2FA} >Request Code</button>
            <form onSubmit={verifyCode}>
                <div className="col-sm-6 mt-3">
                    <div className="input-group">
                        <div className="input-group-text">Code</div>
                        <input type="text" className="form-control" id="code" name='code' onChange={handleSecretChange} placeholder="Code" />
                    </div>
                </div>
                <div className="col-auto mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {state.loading && (
                        <span className="ms-2 fw-bold">Loading...</span>
                    )}

                </div>
            </form>
        </div>
    );
}

export default Confirmation;