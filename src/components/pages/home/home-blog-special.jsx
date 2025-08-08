import BlogSpecial from "@/src/components/blog/blog-special";
import ContainerWrapper from "@/src/components/common/container-wrapper";
const { blog_special } = require("@/src/constants/blog")

const HomeBlogSpecial = () => {
    return (
        <ContainerWrapper>
            <div className="home-blog-special flex flex-col md:flex-row justify-center mb-20 px-10 gap-20">
                {blog_special.map((item) => (
                    <BlogSpecial className="max-w-[630px] flex-1" key={item.id} image={item.image} title={item.title} description={item.description} url={item.url} />
                ))}
            </div>
        </ContainerWrapper>
    )
}

export default HomeBlogSpecial;