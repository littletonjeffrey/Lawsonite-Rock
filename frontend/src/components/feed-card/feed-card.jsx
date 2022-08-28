import { GrFavorite } from "react-icons/gr";
import { RiChat4Line } from "react-icons/ri";
import { IoMdRepeat } from "react-icons/io";
import { MdPublish } from "react-icons/md";

const Post = forwardRef(({ userName, thoughtBody }, ref, alt) => {
  return (
    <div className="post" ref={ref}>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{userName}</h3>
          </div>
          <div className="post__headerDescription">
            <p>{thoughtBody}</p>
          </div>
        </div>
        <img src={image} alt={alt} />
        <div className="post__footer">
          <RiChat4Line fontSize="small" />
          <IoMdRepeat fontSize="small" />
          <GrFavorite fontSize="small" />
          <MdPublish fontSize="small" />
        </div>
      </div>
    </div>
  );
});

export default Post;
