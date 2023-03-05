import React , {useState} from 'react'
import './Profile.css'
import { useContext } from 'react';
import { UserContext } from './components/contexts/UserContext'


export default function Profile() {
  const { user} = useContext(UserContext); // provide a default value for user
  const [edit, setEdit] = useState(user);
  const [imageFile, setImageFile] = useState(null);
  
  function editProfile(e) {
      setEdit(e.target.value)
  }

  return (
      <>
      <div className="container">
          <h1 className="edit-profile">Edit Profile</h1>
          <div className="row">
              <div className="col-md-3">
                  <div className="text-center">
                      <img src={imageFile ? URL.createObjectURL(imageFile) : "//placehold.it/100"} className="avatar img-circle" alt="avatar"/>
                      <h6>Upload a different photo...</h6>
                      <input type="file" className="form-control" onChange={(e) => setImageFile(e.target.files[0])}/>
                  </div>
              </div>
    
      <div className="col-md-9 personal-info">
        <div className="alert alert-info alert-dismissable">
          <i className="fa fa-coffee"></i>
          Please Save Changes after editing your Profile
        </div>
        <h3>Personal info</h3>
        
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label className="col-lg-3 control-label">First name:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value={user.full_name.split(" ")[0]} onChange={editProfile}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Last name:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value={user.full_name.split(" ")[1]} onChange={editProfile}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" value={user.email} onChange={editProfile}/>
            </div>
          </div>
          {/* <div className="form-group">
            <label className="col-md-3 control-label">Username:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" value="janeuser"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Password:</label>
            <div className="col-md-8">
              <input className="form-control" type="password" value="11111122333"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Confirm password:</label>
            <div className="col-md-8">
              <input className="form-control" type="password" value="11111122333"/>
            </div>
          </div> */}
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <input type="button" className="btn btn-primary" value="Save Changes"/>
              <span></span>
              <input type="reset" className="btn btn-default" value="Cancel"/>
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
<hr></hr>
  </>

  )
}
