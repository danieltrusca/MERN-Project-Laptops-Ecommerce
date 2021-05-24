import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated successfully");
      })
      .catch((error) => {
        setLoading(false);
        setPassword("");
        console.log(error);
        toast.error("something wrong happened");
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form className=" mt-5" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              value={user.email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="enter new password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              value={password}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 mx-auto">
          <UserNav />
        </div>

        <div className="col mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <h4>Password Update</h4>
              )}
              {passwordUpdateForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
