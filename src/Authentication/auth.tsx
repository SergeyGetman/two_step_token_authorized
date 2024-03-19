import { Outlet } from "react-router-dom";
import SignIn from "./Login";
import React from "react";

interface MCheckAVtorized {
  avtorized?: boolean;
}

const Auth: React.FC<MCheckAVtorized> = ({avtorized}) => {
  return (
    <div >
        <SignIn text={""} checkAvtorized={avtorized} />

    </div>
  );
};

export default Auth;
