import "./blog.styles.scss";
import { blogHomeItems } from "../../../../../data/blogs.data.ts";
import { strings } from "../../../../../i18n/strings.ts";

const Blog = () => {
  return (
    <section className="blog-section">
      <div className="title">{strings.blogHome.blog}</div>
      <div className="blog-list">
        {blogHomeItems.map((item) => (
          <a
            href="#"
            className={`blog-item ${item.promoted ? "blog-promoted" : ""}`}
            key={item.id}
          >
            <img src={item.imageUrl} alt={item.title} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">{item.title}</h3>
              <h4 className="blog-subtitle">{item.subtitle}</h4>
              {item.promoted ? (
                <p className="blog-excerpt">{item.excerpt}</p>
              ) : null}
              <p className="tag-name">@ {item.tagName}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Blog;
