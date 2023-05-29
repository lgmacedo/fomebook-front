import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import dayjs from "dayjs";

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
  }, [profile]);

  function profileSuccess(res) {
    setProfile(res.data);
  }

  function followUser(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = api.post("/follow", { id }, config);
    promise.then(() => setProfile(profile));
  }

  function likePost(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = api.post("/like", { id }, config);
    promise.then(() => setProfile(profile));
  }

  return (
    <UserContainer>
      <ProfileContainer>
        <img src={profile.userPicture} />
        <ProfileData>
          <p>{profile.name}</p>
          <p>{profile.bio}</p>
          <ProfileButtons>
            <button onClick={() => followUser(profile.id)}>
              {profile.isFollowed ? "Seguindo" : "Seguir"}
            </button>
          </ProfileButtons>
        </ProfileData>
      </ProfileContainer>
      <PostsContainer>
        {profile.posts &&
          profile.posts.map((p) => (
            <Post key={p.id}>
              <img src={p.postPicture} />
              <PostData>
                <PostLikes onClick={() => likePost(p.id)}>
                  {p.wasLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  <p>{p.wasLiked ? "Curtido" : "Curtir"}</p>
                </PostLikes>
                <p>
                  {dayjs(p.createdAt)
                    .locale("pt-br")
                    .format("DD/MM/YYYY [às] HH:mm")}
                </p>
              </PostData>
              <PostDescription>{p.postDescription}</PostDescription>
            </Post>
          ))}
      </PostsContainer>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Quicksand", sans-serif;
  padding-bottom: 25px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 25px;
  align-items: center;
  background-color: white;
  height: 175px;
  width: 50vw;
  margin-top: 25px;
  margin-bottom: 25px;
  column-gap: 25px;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  font-weight: 300;
  border-radius: 5px;
`;

const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p:nth-child(1) {
    font-size: 25px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  p:nth-child(2) {
    font-size: 20px;
    margin-bottom: 15px;
  }
  button {
    color: grey;
    outline-style: none;
    text-decoration: none;
  }
`;

const ProfileButtons = styled.div`
  display: flex;
  column-gap: 10px;
  a {
    outline-style: none;
    text-decoration: none;
    color: #5a5959;
  }
  button {
    height: 28px;
    font-size: 15px;
    cursor: pointer;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 50vw;
  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    border-bottom: 1px solid whitesmoke;
  }
  border-radius: 5px;
  font-size: 20px;
`;

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
`;

const PostLikes = styled.div`
  display: flex;
  svg {
    margin-right: 10px;
  }
  cursor: pointer;
`;

const PostDescription = styled.p`
  padding: 15px;
`;
