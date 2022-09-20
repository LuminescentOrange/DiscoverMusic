import React from "react";
import ReactDOM from "react-dom";
import { useState } from 'react';
import { Button, Layout, Row ,Col, Form, Input, message, Modal} from 'antd'
import { SearchOutlined, FireOutlined, LikeOutlined, CommentOutlined,HeartOutlined, FastForwardFilled } from '@ant-design/icons';
import "antd/dist/antd.css";
import './App.css';
import Axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;

function App() {
 
  const [name,setName] = useState(''); //set: func to change
  //const [id,setId] = useState('');

  // const displaySearch = () =>{
  //   console.log(name + id);
  // };

  const [artistList, setArtistList] = useState([]);
  const [topArtistList, setTopArtistList] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [addComments, setAddComments] = useState([]);
  const [currSongID, setCurrSongID] = useState([]);
  const [firstReviewID, setReviewID] = useState(0);
  const [topHot, setTopHot] = useState([]);
  const [currUser, setCurrUser] = useState('0001');
  const [currUserName, setCurrUserName] = useState('Arya');
  const [loggedIn, setLoggedIn]= useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [numbReviews, setNumbReviews] = useState(0);
  const [returnStatement, setReturnStatement] = useState('No user');
  //update like counter
  //const [likes, setLikes]= useState(0);
  //const [currSong, setCurrSong] = useState();

  // const likeClicked = (sID) => {
  //   setCurrSong(sID)
  //   console.log(sID)
  // };
  const signoutOnClick = () => {
    setLoggedIn(false);
    setCurrUser('0001');
  }

  
  const handleCancel = () => {
    setDisplayModal(false);
  }
 
  const signinOnClick = () => {
    setDisplayModal(true);
  }

  async function setUser(response) {
    console.log(response);
    setReturnStatement(response.data[0][0].return_statement);
    setCurrUser(response.data[0][0].user_id_return);
    setNumbReviews(response.data[0][0].review_count_return);
    setCurrUserName(response.data[0][0].user_name_return);
  }
 
  const onFinish = (data) => {
    console.log(data);
    setEnteredUsername(data.user_id);
    setEnteredPassword(data.password);
    setDisplayModal(false);
    Axios.post('http://localhost:3001/login',{
      userName:enteredUsername,
      password: enteredPassword
    }).then((response)=>{
      setUser(response);
      setLoggedIn(true);
      console.log("statement : " + returnStatement);
       console.log("current user: "  + currUser);
       console.log("review count : " + numbReviews);
    }).catch(err=>{console.log(err)});
   
  };


  const search = () => {
    //console.log(name);
    Axios.post('http://localhost:3001/search',{
      name:name,
      //id:id,
    }).then((response)=>{
      console.log(response);
      setArtistList(response.data);
      console.log(artistList);
    //   setArtistList(
    //     [...artistList,{artistName:name,
    //     artistID:id,
    //   },
    // ]
    // ); 
    //console.log("success axios search")
    });
    // console.log("after");
  };


  const like = (sID, sLikes) => {
    console.log(sLikes, sID);
    Axios.put('http://localhost:3001/like',{
      songID:sID,
      likeCounter:sLikes,
     })
     //.then((response)=>{
      //console.log(response);
      // setLikes(response.data);
      // console.log(artistList);
    //   setArtistList(
    //     [...artistList,{artistName:name,
    //     artistID:id,
    //   },
    // ]
    // ); 
    //console.log("success axios search")
   // });
    // console.log("after");
  };

   
  const getTopArtistName = () => {
    Axios.get('http://localhost:3001/topartist').then((response)=>{ //send from backend, receive from fe, need to receive, get response
      console.log(response);
      setTopArtistList(response.data);
      console.log(topArtistList);

    }).catch(err=>{console.log(err)});
  }

  const getTopHot = () => {
    Axios.get('http://localhost:3001/tophot').then((response)=>{ //send from backend, receive from fe, need to receive, get response
      console.log(response);
      setTopHot(response.data);
      console.log(topHot);

    }).catch(err=>{console.log(err)});
  }

  const getUserComments = () => {
    Axios.get('http://localhost:3001/comments').then((response)=>{ //send from backend, receive from fe, need to receive, get response
    console.log(response);
    setUserComments(response.data);
    console.log(userComments);

  }).catch(err=>{console.log(err)});
  }

  const deleteReview = (firstReviewID) => {
    console.log(firstReviewID);
    Axios.put('http://localhost:3001/delete',{
      firstReviewID: firstReviewID,
     })
  };


  const insert = (reviewContent, songID) => {
    console.log(reviewContent, songID);
    Axios.get('http://localhost:3001/insert').then((response)=>{ //send from backend, receive from fe, need to receive, get response
      console.log(response);
      //console.log(response.data[0].max + 1 + "here");
      setReviewID(response.data[0].max + 1);

    }).catch(err=>{console.log(err)});
    console.log(firstReviewID);

    Axios.put('http://localhost:3001/insert2',{
      reviewContent: reviewContent,
      songID: songID,
      firstReviewID: firstReviewID,
      currUser: currUser
     });
  };

  return (
  <Layout>
    <Header>
      <Row justify="space-between">
       
        <Col>
          {
           loggedIn ? 
           <>
           <Button shape="round" onClick={signoutOnClick}>
              hello {currUserName}</Button> 
              <div className="welcome">{returnStatement} {currUserName} <br/> Number of Reviews : {numbReviews}</div>
           </>
            :
            (
              <>
              <Button shape="round" onClick={signinOnClick} style={{ marginRight: '20px' }}>
              Login</Button>
              <Modal
                title="Log in"
                visible={displayModal}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
              >
                <Form
                  name="normal_login"
                  onFinish={onFinish}
                  preserve={false}
                >
                  <Form.Item
                    name="user_id"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>
       
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Login</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
            //<Login></Login>
            )
          }
        </Col>

     

      </Row>
      </Header>


    <div className="App">
      
      <div className = "search">
        <label>Name: </label>
        
        <input type = "text" onChange={(event) => {
          setName(event.target.value);
          }}
        />

        <div className='showSearch'>   
            
            <Button className="button1" type="primary" style={{ marginLeft: 8 }} onClick={search} icon={<SearchOutlined />}>Search</Button>
            {artistList.map((val, key) => {
              if(val.sName != null) {
                return (
                  <div className='searchResult'>            
                      <h3>Artist: {val.artName}</h3>
                      <h3>Album: {val.alName}</h3>
                      <h3>Song: {val.sName}</h3>
                      <h3>SongID: {val.sID}</h3>
                      <Button className="likebutton" type="primary" size="small" onClick={()=>{like(val.sID, val.sLikes)}} style={{ marginLeft: 8 }} icon={<HeartOutlined />}>Like</Button>
                      <h3> {val.sLikes}</h3>
                  </div>
                        );
              }
              return (
              <div className='searchResult'>            
                  <h3>Artist: {val.artName}</h3>
                  <h3>Album: {val.alName}</h3>
                  <h3>Song: {val.sName}</h3>
                  <h3>SongID: {val.sID}</h3>
              </div>
                    );
            })}
        </div>
      </div>

      <div className='topArtist'>
        <Button  className="button1" type="primary"  onClick={getTopArtistName} style={{ marginLeft: 8 }} icon={<LikeOutlined />}>Top Artists</Button>
        
            {topArtistList.map((val, key) => {
              return (
              <div className='topResult'>
                  <h3>Artist: {val.artistName}</h3>
                  <h3>Like: {val.sumLike}</h3>
              </div>
                    );
            })}
      </div>

      <div className='topArtist'>
        <Button className="button1" type="primary"  onClick={getTopHot} style={{ marginLeft: 8 }} icon={<FireOutlined />}>Hot Songs Right Now</Button>
        
            {topHot.map((val, key) => {
              return (
              <div className='topResult'>
                  <h3>Song: {val.songName}</h3>
                  <h3>Hot Counter: {val.hotCounter}</h3>
              </div>
                    );
            })}
      </div>

      <div className='userComments'>
        <Button className="button1" type="primary"  onClick={getUserComments} style={{ marginLeft: 8 }} icon={<CommentOutlined />}>Show User Comments</Button>
        
            {userComments.map((val, key) => {
              return (
              <div className='commentResult'>
                  <h3>Song Name: {val.songName}</h3>
                  <h3>User Name: {val.userName}</h3>
                  <h3>{val.reviewContent}</h3>
                  <Button className="button1" type="primary" style={{ marginLeft: 8 }} onClick={()=>{deleteReview(val.firstReviewID)}} >Delete</Button>
              </div>
                    );
            })}
      </div>

      <div className = "Comments">
        <label>Comment: </label>
        
        <input type = "text" onChange={(event) => {
          setAddComments(event.target.value);
          }}
        />
        <label>SongID: </label>
        
        <input type = "text" onChange={(event) => {
          setCurrSongID(event.target.value);
          }}
        />

        <div className='addComments'>   
            
            <Button className="button1"type="primary" style={{ marginLeft: 8 }} onClick={()=>insert(addComments, currSongID)} icon={<CommentOutlined />}> Add Comment</Button>
            
        </div>
      </div>




        


    </div>
  </Layout>

  );
}

export default App;
