import fetchImages from "@/lib/fetchImages"
import type { ImagesResults } from "@/models/Images"
import ImgContainer from "./ImgContainer"
import addBlurredDataUrls from "@/lib/getBase64"
import getPrevNextPages from "@/lib/getPrevNextPages"
import Footer from "./Footer"

type Props = {
    topic?: string | undefined,
    page?: string | undefined,
}

export default async function Gallery({ topic = 'curated', page }: Props) {

    let url
    if (topic === 'curated' && page) {
        url = `https://api.pexels.com/v1/curated?page=${page}`
    } else if (topic === 'curated') {
        url = 'https://api.pexels.com/v1/curated'
    } else if (!page) {
        url = `https://api.pexels.com/v1/search?query=${topic}`
    } else {
        url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
    }

    const images: ImagesResults | undefined = await fetchImages(url)

    if (!images) return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>

    const photosWithBlur = await addBlurredDataUrls(images)

    const { prevPage, nextPage } = getPrevNextPages(images)

    return (
        <>
            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">

                {photosWithBlur.map(photo => (
                    <ImgContainer key={photo.id} photo={photo} />
                ))}

            </section>

            <Footer topic={topic} prevPage={prevPage} nextPage={nextPage} />
        </>
    )
}