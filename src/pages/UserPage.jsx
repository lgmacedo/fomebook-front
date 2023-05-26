import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function UserPage() {
  const [user, setUser] = useContext(UserContext);

  const [profile, setProfile] = useState({});

  const { idPerfil } = useParams();

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
      const promise = api.get(`/user/${idPerfil}`, config);
      promise.then(profileSuccess);
    }
  }, []);

  function profileSuccess(res) {
    setProfile(res.data);
  }

  return (
    <UserContainer>
      <ProfileContainer>
        <img src={profile.userPicture} />
        <p>{profile.name}</p>
        <p>{profile.bio}</p>
        <p>{profile.isFollowed}</p>
      </ProfileContainer>
      <PostsContainer>
        {profile.posts &&
          profile.posts.map((p) => (
            <Post>
              <img src={p.postPicture} />
              <p>{p.postDescription}</p>
              <p>{p.wasLiked}</p>
              <p>{p.createdAt}</p>
            </Post>
          ))}
      </PostsContainer>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const ProfileContainer = styled.div`
  img {
    width: 100px;
  }
`;

const PostsContainer = styled.div`
  img {
    width: 100px;
  }
`;

const Post = styled.div``;
