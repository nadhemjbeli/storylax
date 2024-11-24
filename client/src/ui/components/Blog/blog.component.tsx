import {FC} from "react";
import "./blog.styles.scss";
import {IBlogData} from "../../../data/blog-page/blogs.data.ts";
import {api_url} from "../../../utils/domain/back.ts";

interface BlogProps {
    blogs: IBlogData[],
    title:string
}

const Blog:FC<BlogProps> = ({blogs, title}) => {
  return (
    <section className="blog-component">
      <div className="title">{title}</div>
      <div className="blog-list">
        {blogs && blogs.map((item) => (
          <a
            href="#"
            className={`blog-item ${item.promoted ? "blog-promoted" : ""}`}
            key={item._id}
          >
            <img src={`${api_url}/${item.principalImage?.default}`} alt={item.title} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">{item.title}</h3>
              {item.promoted &&
                <p className="blog-excerpt">{item.resume}</p>}
              <p className="tag-name">#{item.author?.firstName}_{item.author?.lastName}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Blog;
