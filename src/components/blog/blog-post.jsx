import BlogCard from "./blog-card";
import { blog_list } from "../../constants/blog";
import ContainerWrapper from "../common/container-wrapper";
import AppCarousel from "../app/app-carousel";
import { CarouselContent, CarouselItem } from "../ui/carousel";

const BlogPost = ({ title, subtitle }) => {
    return (
        <ContainerWrapper>
            <div className="blog-post__wrapper relative mb-20 text-center">
                <div className="blog-post__subtitle text-[13px] uppercase font-[600] tracking-[2px] text-[var(--color-primary)]">
                    <h2>{subtitle}</h2>
                </div>
                <div className="blog-post__title text-[60px] font-[shippori_mincho] uppercase tracking-[3px] text-white mb-8">
                    <h1>{title}</h1>
                </div>
                <div className="blog-post__list px-5">
                    <AppCarousel opts={{
                        align: "start"
                    }}>
                        <CarouselContent className="gap-x-8">
                            {blog_list.map((item) => (
                                <CarouselItem key={item.id} className="sm:basis-1/2 xl:basis-1/3">
                                    <BlogCard className="sm:basis-1/2 xl:basis-1/3" key={item.id} item={item} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </AppCarousel>
                </div>
            </div>
        </ContainerWrapper>
    )
}

export default BlogPost;