import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { setDatasets } from "react-chartjs-2/dist/utils";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { sendAxiosRequest } from "../utils/sendAxiosRequest";
import { useForm, Resolver } from "react-hook-form";
import { number } from "echarts";

interface MSignProps {
  text: string;
  checkAvtorized?: boolean;
  onClick?: () => void;
}
interface ISubmitResult {
  status: boolean;
  statusCode: string;
  apiToken: string;
}

const initialState: ISubmitResult = {
  status: false,
  statusCode: "",
  apiToken: "",
};

interface IUser {
  apiKey?: any;
  apiLogin?: any;
}

const SignIn: React.FC<MSignProps> = ({ text }) => {
  const [validated, setValidated] = useState(false);
  const [getDataUserForm, setgetDataUserForm] = useState<IUser>({
    apiKey: "",
    apiLogin: "",
  });
  const [err, setError] = useState("");
  // const [data, setData] = useState({})
  const [getStatus, setGetStatus] = useState<ISubmitResult>(initialState);

  const handleChangeEmailForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setgetDataUserForm({ ...getDataUserForm, apiKey: e.target.value });
  };

  const handleChangePasswordForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setgetDataUserForm({ ...getDataUserForm, apiLogin: e.target.value });
  };

  function removeSmallest(numbers) {
    const newArr = [...numbers];

    const min = Math.min.apply(0, numbers);

    newArr.find((el, idx, array) => {
      if (array.indexOf(min)) {
        newArr.splice(min);
      }
    });

    return newArr;
  }

  removeSmallest(arr);

  if (getStatus?.status) {
    return (
      <div>
        <Routes>
          <Route index element={<Navigate to="/pages/emptypage/" />} />
        </Routes>
      </div>
    );
  }

  // let navigate = useNavigate();
  // const routeChange = () =>{
  //   let path = `${process.env.PUBLIC_URL}/dashboard/dashboard-1/`;
  //   navigate(path);
  // }

  // const Login = (e:any) => {
  //   e.preventDefault();
  //   auth.signInWithEmailAndPassword(email, password).then(
  //     user => {console.log(user);routeChange()}).catch(err => {console.log(err);setError(err.message)})
  // }

  //data must be HEADERS and body {
  //HEADERS
  //   Authorization: "Bearer " + api_token
  //   Accept: "aplication/json"
  // }
  //BODY
  // {
  //   userLogin: "string",
  //   userPassword: "string"
  // }

  //AUTH TOKEN
  const getAuthorized = () => {
    const token = localStorage.getItem("token");
    return sendAxiosRequest({
      method: "POST",
      data: JSON.stringify(getDataUserForm),
      responseType: "json",
      url: "https://test.bridesfactory.gorakoda.com/api/v0/clients/token",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setGetStatus(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("User is not autorized");
        }
      });
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    getAuthorized();
  };

  return (
    <React.Fragment>
      <div className="square-box"></div>
      <div className="page bg-primary">
        <div className="page-single">
          <div className="container" style={{ marginTop: "89px" }}>
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link to="#">
                          <img
                            src={require("../assets/img/brand/favicon.png")}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2>Welcome back!</h2>
                          <h6 className="font-weight-semibold mb-4">
                            Please sign in to continue.
                          </h6>
                          <div className="panel panel-primary">
                            <div className=" tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                {err && <Alert variant="danger">{err}</Alert>}
                                <Form
                                  noValidate
                                  validated={validated}
                                  onSubmit={handleSubmit}
                                >
                                  <Form.Group className="form-group">
                                    <Form.Label className="">Email</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your email"
                                      name="email"
                                      type="text"
                                      value={getDataUserForm.apiKey}
                                      onChange={(event) =>
                                        handleChangeEmailForm(event)
                                      }
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>Password</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="Enter your password"
                                      name="password"
                                      type="password"
                                      value={getDataUserForm.apiLogin}
                                      onChange={(event) =>
                                        handleChangePasswordForm(event)
                                      }
                                      required
                                    />
                                  </Form.Group>
                                  <Button
                                    className="btn btn-primary btn-block"
                                    onClick={(e) => handleSubmit(e)}
                                  >
                                    ENTERED
                                  </Button>

                                  <div className="mt-4 d-flex text-center justify-content-center mb-2">
                                    <Link
                                      to="https://www.facebook.com/"
                                      target="_blank"
                                      className="btn btn-icon btn-facebook me-3"
                                      type="button"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-facebook tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </Link>
                                    <Link
                                      to="https://www.twitter.com/"
                                      target="_blank"
                                      className="btn btn-icon me-3"
                                      type="button"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-twitter tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </Link>
                                    <Link
                                      to="https://www.linkedin.com/"
                                      target="_blank"
                                      className="btn btn-icon me-3"
                                      type="button"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-linkedin tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </Link>
                                    <Link
                                      to="https://www.instagram.com/"
                                      target="_blank"
                                      className="btn  btn-icon me-3"
                                      type="button"
                                    >
                                      <span className="btn-inner--icon">
                                        {" "}
                                        <i className="bx bxl-instagram tx-18 tx-prime"></i>{" "}
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="main-signin-footer text-center mt-3">
                                    <p>
                                      <Link to="#" className="mb-3">
                                        {text}
                                      </Link>
                                    </p>
                                    <p>
                                      Don't have an account ?{" "}
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/authentication/signup`}
                                        className=""
                                      >
                                        {" "}
                                        {text}
                                      </Link>
                                    </p>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
