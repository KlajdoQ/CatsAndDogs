import React , {useState} from 'react'
import './SignUp.css'
export default function SignUp({changeAuthMode, setAuthMode}) {
  let [signUpForm, setSignUpForm] = useState({
    full_name: "",
    email: "",
    password: ""
  });

  
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: signUpForm }),
    })
      .then((response) => {
        if (response.ok) {
          // User is registered - redirect to the sign in page
          window.location.replace("/login");
        } else if (response.status === 422) {
          // Registration failed - display validation errors
          return response.json().then((data) => {
            throw new Error(data.errors.join(", "));
          });
        } else {
          // Display other error messages returned by the server
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error(error);
        // Display error message to the user
      })
  }
  
  const handleSignUpFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="signup-page">

    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSignUpSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Log In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={signUpForm.full_name}
              name="full_name"
            onChange={handleSignUpFormChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={signUpForm.email}
              onChange={handleSignUpFormChange}
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={signUpForm.password}
              onChange={handleSignUpFormChange}
              name="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          </p>
        </div>
      </form>
    </div>
    </div>
  )
}
