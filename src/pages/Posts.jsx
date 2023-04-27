/* eslint-disable no-console */
import { useEffect, useState } from 'react';

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      setLoading(true);

      const response = await fetch('https://codebuddy.review/posts');

      const resData = await response.json();
      const { data } = resData;

      setPosts(data?.posts ?? []);

      setLoading(false);

      console.log('data ', data);
    } catch (error) {
      console.log('error ', error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {' '}
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <section>
          <div className="display-5 text-center mb-3 mt-3 font-italic"> Posts Section</div>
          <div className="container d-flex flex-wrap justify-content-around ">
            {posts?.map(post => {
              const { firstName, lastName, writeup, image } = post;
              return (
                <div
                  key={post.id}
                  className="col-lg-3 col-md-5 col-sm-10 m-4 p-2  border border-light border-3 rounded"
                >
                  <div className="row p-3">
                    <div className="col-6  h-100">
                      {' '}
                      <img className="img-fluid" src={image} alt="img" />
                    </div>

                    <div className="col-6">
                      <div className="row h2 text-muted font-italic">
                        {firstName} {lastName}
                      </div>
                    </div>
                  </div>
                  <div className="row p-3 text-lg-left lead font-italic">{writeup}</div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Posts;
