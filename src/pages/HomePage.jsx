import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext);

  const [feed, setFeed] = useState({});

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken === null) {
      navigate("/");
    } else {
      setUser(JSON.parse(userToken));
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(userToken).token}`,
        },
      };
      const promise = api.get("/feed", config);
      promise.then(feedSuccess);
    }
  }, []);

  function feedSuccess(res) {
    setFeed(res.data);
  }

  return (
    <FeedContainer>
      <ProfileContainer>
        <img src={feed.userPicture}/>
        <p>{feed.name}</p>
        <p>{feed.bio}</p>
        <button><Link to="/seguidores">Ver seguidores</Link></button>
        <button><Link to="/seguindo">Ver quem eu sigo</Link></button>
      </ProfileContainer>
    <PostsContainer>
        {feed.posts && feed.posts.map(p=>(
            <Post>
                <img src={p.postPicture}/>
                <p>{p.postDescription}</p>
                <p>{p.timesLiked}</p>
                <p>{p.createdAt}</p>
            </Post>
        ))}
      </PostsContainer>
      <button><Link to="/novo">NEW POST</Link></button>
      <button><Link to="/buscar">BUSCAR</Link></button>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const ProfileContainer = styled.div`
    img{
        width: 100px;
    }    
`;

const PostsContainer = styled.div`
    img{
        width: 100px;
    }    
`;

const Post = styled.div`

`;