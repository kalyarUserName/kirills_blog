import React from "react";
import { useNavigate } from "react-router-dom";

import NewestPost from "../../components/bigPost/bigPost.component";
import PostCard from "../../components/postCard/postCard.component";

import "./home.styles.scss";

import { Users } from "../../utils/types";
import { dateToString } from "../../utils/general";
export const dataPosts = [
  {
    id: 1,
    image: "/images/foods/picnic.jpg",
    headline: "One day we went on a picnic together",
    textPreview:
      "One day friends gathered and went on a picnic together.They took food and various sports equipment with them so as not to download.They arrived at a small clearing and laid out everything they took with them.There friends talked and had fun.Soon it was time to go home.They cleaned up after themselves and went home.",
    user: Users[0],
    date: new Date("2022-06-01"),
  },
  {
    id: 2,
    image: "/images/foods/breakfast.jpg",
    headline: "The best breakfast for me",
    textPreview:
      "I started forcing myself to wash all the dishes before going to bed. In the morning, it became easier to get involved in the work rhythm, it was more pleasant to cook breakfast at home, there were forces to do exercises, and then the whole day began to take shape. ",
    user: Users[1],
    date: new Date("2022-02-01"),
  },
  {
    id: 3,
    image: "/images/foods/breakfast2.jpg",
    headline: "Today I almost managed to repeat the previous breakfast",
    textPreview:
      "When my guests come, there is no strain on my husband from them: I meet them, I set the table, I clean up and I do my dishes too. When my husband's relatives come, for some reason, service is also required from me. Recently, his parents came from another city",
    user: Users[0],
    date: new Date("2022-01-01"),
  },

  {
    id: 4,
    image: "/images/foods/pancake.webp",
    headline: "How I fell in love with pancakes",
    textPreview:
      "Pancakes are a traditional delicacy of the Russian people, one of the most beloved and revered dishes, both in the times of ancient Russia and now",
    user: Users[2],
    date: new Date("2020-01-01"),
  },
  {
    id: 5,
    image: "/images/foods/salmon.jpg",
    headline: "lunch with fish",
    textPreview:
      "Fish according to this recipe is first fried, acquiring a ruddy crust, and then stewed in sour cream with onions and carrots.",
    user: Users[3],
    date: new Date("2019-06-01"),
  },
  {
    id: 6,
    image: "/images/foods/sweets.jpg",
    headline: "Sweets are my weakness",
    textPreview:
      'Sweets are my weakness... I can\'t do without them and I suffer a lot. It is no coincidence that even my concert program and one of the music albums is called "Life is Candy!"',
    user: Users[4],
    date: new Date("2019-03-01"),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const redirectToBlog = (id: number) => {
    navigate("/blog/" + id);
  };
  return (
    <div className={"posts-container"}>
      <div className="newest-post">
        <NewestPost
          key={dataPosts[0].id}
          id={dataPosts[0].id}
          image={dataPosts[0].image}
          headline={dataPosts[0].headline}
          date={dateToString(dataPosts[0].date)}
          textPreview={dataPosts[0].textPreview}
          user={dataPosts[0].user}
          toNavigate={redirectToBlog}
        />
        <hr />
      </div>

      <div className="post-list">
        {dataPosts
          .filter((post) => post !== dataPosts[0])
          .map((post) => {
            return (
              <PostCard
                id={post.id}
                key={post.id}
                user={post.user}
                headline={post.headline}
                textPreview={post.textPreview}
                date={dateToString(post.date)}
                image={post.image}
                toNavigate={redirectToBlog}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
