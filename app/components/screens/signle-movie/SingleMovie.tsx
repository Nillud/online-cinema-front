import { FC } from 'react'
import { IMoviePage } from '../../../../pages/movie/[slug]'
import Meta from '@/utils/meta/Meta'
import Banner from '@/components/ui/banner/Banner'
import SubHeading from '@/components/ui/heading/SubHeading'
import Gallery from '@/components/ui/gallery/Gallery'
import Content from './Content/Content'
import dynamic from 'next/dynamic'

const DynamicPlayer = dynamic(() => import('@/components/ui/video-player/VideoPlayer'), { ssr: false })

const SingleMovie: FC<IMoviePage> = ({
    movie,
    similarMovies
}) => {
    return (
        <Meta
            title={movie.title}
            description={`Watch ${movie.title}`}
        >
            <Banner image={movie.bigPoster} Detail={() => <Content movie={movie} />} />

            <DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

            <div className='mt-12'>
                <SubHeading title='Similar' />
                <Gallery items={similarMovies} />
            </div>
        </Meta>
    )
}

export default SingleMovie