const renderPlayer = (url, title) => {
    const videoType = getVideoType(url);
    switch (videoType) {
        case 'youtube': {
            const youtubeId = url.includes('youtube.com')
                ? new URL(url).searchParams.get('v')
                : url.split('/').pop();
            return (
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            );
        }

        case 'vimeo': {
            const vimeoId = url.split('/').pop();
            return (
                <iframe
                    className="w-full h-full"
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                    title={title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            );
        }

        case 'file':
            return (
                <video
                    className="w-full h-full"
                    controls
                    autoPlay
                    poster={thumbnailVideo}
                >
                    <source src={url} type={`video/${url.split('.').pop()}`} />
                    Browser does not support this video format.
                </video>
            );

        default:
            return <p className="text-red-500">Unsupported video format: {url}</p>;
    }
};

const getVideoType = (url) => {
    if (!url) return "unknown";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("vimeo.com")) return "vimeo";
    if (url.match(/\.(mp4|webm|ogg)$/)) return "file";

    return "unknown";
};

export { renderPlayer, getVideoType };