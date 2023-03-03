import React , {useState} from 'react'
import { useContext } from 'react';
import { UserContext } from './components/contexts/UserContext'


export default function Profile() {
    const { user} = useContext(UserContext); // provide a default value for user
    const [edit, setEdit] = useState(user)
    
    
    
    function editProfile(e) {
        setEdit(e.target.value)
    }

  return (
  <>
<div className="container">
    <h1>Edit Profile</h1>
  
	<div className="row">
      
      <div className="col-md-3">
        <div className="text-center">
          <img src="//placehold.it/100" className="avatar img-circle" alt="avatar"/>
          <h6>Upload a different photo...</h6>
          
          <input type="file" className="form-control"/>
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
          <div className="form-group">
            <label className="col-lg-3 control-label">Time Zone:</label>
            <div className="col-lg-8">
              <div className="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                  <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                  <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
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
