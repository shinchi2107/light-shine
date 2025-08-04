import BlogSpecial from "@/components/blog/blog-special";
const { blog_special } = require("@/constants/blog")

const HomeBlogSpecial = () => {
    return (
        <div className="home-blog-special flex justify-between mb-20 px-10 gap-x-20">
            {blog_special.map((item) => (
                <BlogSpecial className="w-1/2 flex-1" key={item.id} image={item.image} title={item.title} description={item.description} url={item.url} />
            ))}
        </div>
    )
}

export default HomeBlogSpecial;