import React, { useEffect, useState } from 'react';
import {auth, db} from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate=useNavigate();


    async function fetchdata(){
        auth.onAuthStateChanged(async(user)=>{
            const docRef=doc(db,'users',user.uid);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails({
                    firstname:docSnap.data().firstname,
                    lastname:docSnap.data().lastname,
                })
            }
            else{
                console.log('user is not logged in')
            }
        })
    }


    async function handleLogout(){
        await auth.signOut();
        navigate('/login');
        setUserDetails(null);
    }

    useEffect(() => {
      fetchdata()
    }, [])
    


    
  return (
    <div className="userprofile-flex-container">
      <div className="userprofile-card">
        

        {
            userDetails ? (<>
            
            <div className="userprofile-card-header">
          <div className="userprofile-avatar-container">
            <div className="userprofile-avatar">
              {`${userDetails.firstname} ${userDetails.lastname}`}
            </div>
            <div className="userprofile-status">
              <div className="userprofile-inner-status" />
            </div>
          </div>
        </div>
        <div className="userprofile-card-body">
          <div className="userprofile-actions">
            <div className="userprofile-icons">
              <div>🤖</div>
              <div>🧠</div>
              <div>👻</div>
            </div>
          </div>
          <div className="userprofile-details">
            <div className="userprofile-detail">
              <div className="userprofile-detail-title">{`${userDetails.firstname} ${userDetails.lastname}`}</div>
              <div className="userprofile-detail-subtitle">jwatson213</div>
            </div>
            <hr className="userprofile-divider" />
            <div className="userprofile-detail">
              <div className="userprofile-detail-header">About me</div>
              <div className="userprofile-detail-content">Word That Describe Me Is SneakerHead!</div>
            </div>
            <div className="userprofile-detail">
              <div className="userprofile-detail-header">Member since</div>
              <div className="userprofile-detail-content">
                <div>👻 Oct 10, 2021</div>
                <div>🤖 Jun 03, 2023</div>
              </div>
            </div>
            <div className="userprofile-detail">
              <div className="userprofile-detail-header">Note</div>
              <div className="userprofile-detail-content">This user is a bot. Be careful.</div>
            </div>
            <div className="userprofile-message-form">
              <div className="userprofile-form">
                <button onClick={handleLogout}>LogOut</button>
              </div>
            </div>
          </div>
        </div>
            </>):(<>
            
                <div className="loading-card-header">
                <div className="userprofile-avatar-container">
            <div className="userprofile-loading-avatar">
              
            </div>
            <div className="userprofile-status">
              <div className="userprofile-inner-loading-status" />
            </div>
          </div>
        </div>
        <div className="userprofile-card-body">
          <div className="userprofile-actions">
            <div className="userprofile-icons">
              <div>🤖</div>
              <div>🧠</div>
              <div>👻</div>
            </div>
          </div>
          <div className="userprofile-details">
            <div className="userprofile-detail">
              <div className="userprofile-detail-title"></div>
              <div className="userprofile-detail-subtitle"></div>
            </div>
            <hr className="userprofile-divider" />
            <div className="userprofile-detail">
              <div className="userprofile-detail-header"></div>
              <div className="userprofile-detail-content"></div>
            </div>
            <div className="userprofile-detail">
              <div className="userprofile-detail-header"></div>
              <div className="userprofile-detail-content">
                <div>👻 </div>
                <div>🤖 </div>
              </div>
            </div>
            <div className="userprofile-detail">
              <div className="userprofile-detail-header"></div>
              <div className="userprofile-detail-content"></div>
            </div>
            <div className="userprofile-message-form">
              <div className="userprofile-form">
                <button disabled style={{backgroundColor:'grey', border:'none'}}>LogOut</button>
              </div>
            </div>
          </div>
        </div>
            </>)
        }
      </div>
    </div>
  );
};

export default UserProfile;
