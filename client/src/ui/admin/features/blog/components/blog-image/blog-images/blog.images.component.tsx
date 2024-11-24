import React, {useState} from 'react';
import {api_url} from "../../../../../../../utils/domain/back.ts";
import {ReactComponent as PlusIcon} from "../../../../../../../assets/svg/plus.icon.svg";
import {blogImageSizes} from "../../../../../../../data/blog-page/blogs.data.ts";


interface IBlogImage {
    _id: string;
    image: string;
    size: string;
}
interface IBlogImagesProps {
    images: IBlogImage[];
    title: string | null;
}
const BlogImages:React.FC<IBlogImagesProps> = ({title, images}) => {
    const [activeSize, setActiveSize] = useState<string>("all");

    const filterImages = (size: string) => {
        setActiveSize(size);
    };

    const filteredImages = activeSize === "all"
        ? images
        : images.filter(image => image.size === activeSize);
    return (
        <div>
            <div className='title-container'>
                <h2>
                    <strong>"{title}"</strong>
                </h2>
                <button className="admin-plus-button"><PlusIcon className='admin-plus-icon'/></button>
            </div>
            {images && images?.length >0?

                <>
                    <div className="filter-buttons">
                        {blogImageSizes.map(size => (
                            <button
                                key={size}
                                className={activeSize === size ? "active" : ""}
                                onClick={() => filterImages(size)}
                            >
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="images-grid">
                        {filteredImages.map((image) => (
                            <div key={image._id} className="image-card">
                                <img src={`${api_url}/${image.image}`} alt={`${image.size} image`} />
                                <p>{image.size}</p>
                            </div>
                        ))}
                    </div>
                </>:
                <h2>
                    No blog images found for this blog.
                </h2>
            }
        </div>
    );
};

export default BlogImages;