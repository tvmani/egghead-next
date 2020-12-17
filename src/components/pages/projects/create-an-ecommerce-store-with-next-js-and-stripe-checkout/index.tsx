import * as React from 'react'
import {FunctionComponent} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'react-markdown'
import Eggo from '../../../images/eggo.svg'
import removeMarkdown from 'remove-markdown'
import {NextSeo} from 'next-seo'
import data from './data'

type ProjectProps = {
  course: any
  dependencies: any
}

const Project: FunctionComponent<ProjectProps> = () => {
  return (
    <>
      <NextSeo
        description={removeMarkdown(data.summary)}
        title={data.title}
        titleTemplate={'%s | egghead.io'}
        twitter={{
          handle: data.instructor.twitter,
          site: `@eggheadio`,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: data.title,
          // url: http_url,
          description: removeMarkdown(data.summary),
          site_name: 'egghead',
          images: [
            {
              url: `https://res.cloudinary.com/dg3gyk0gu/image/upload/v1608044328/next.egghead.io/pages/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/card_2x.png`,
            },
          ],
        }}
      />
      <div>
        <article className="">
          <header className="relative -mx-5 px-5">
            <div className="absolute left-0 top-0 sm:-mt-5 -mt-3 h-3 w-full bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500" />
            <div className="flex md:flex-row flex-col md:space-x-10 md:space-y-0 space-y-6 items-center md:pb-16 pb-8 md:pt-8 pt-4 max-w-screen-lg mx-auto">
              <div className="flex-shrink-0 mt-8">
                <Image
                  src={data.image}
                  alt={data.title}
                  width={288}
                  height={288}
                  quality={100}
                />
              </div>
              <div className="space-y-3">
                <div className="uppercase font-medium tracking-wide text-xs md:text-left text-center text-pink-600">
                  Portfolio Project
                </div>
                <h1 className="md:text-3xl text-3xl md:text-left text-center font-bold tracking-tight leading-tight pb-6 max-w-screen-sm">
                  {data.title}
                </h1>
                <Tags tags={data.tags} />
              </div>
            </div>
          </header>
          <main>
            <Markdown
              className="prose prose-lg md:prose-xl max-w-screen-md mx-auto"
              source={data.summary}
            />
            <div className="mt-20 bg-gray-50 -mx-5 pt-24 xl:px-0 px-5">
              <div className="max-w-screen-lg mx-auto">
                <div className="mb-4 uppercase font-medium tracking-wide text-sm md:text-left text-center text-blue-600">
                  What You’ll Build for Your Portfolio
                </div>
                <h2 className="sm:text-2xl text-3xl sm:text-left font-semibold text-center leading-tighter pb-12">
                  How to build a start-to-finish dynamic Next.js app
                </h2>
                {data.resources.map((part, idx) => {
                  const isLast = idx === data.resources.length - 1
                  return <Part part={part} idx={idx} isLast={isLast} />
                })}
              </div>
            </div>
            <div className="bg-gradient-to-b from-gray-700 to-gray-900 -mx-5 md:pt-24 pt-10 pb-40 xl:px-0 px-5 text-white ">
              <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:text-left text-center">
                <div>
                  {/* <div className="mb-2 uppercase font-medium tracking-wide text-sm md:text-left text-center text-purple-300">
                        What You’ll Build for Your Portfolio
                      </div> */}
                  <p className="text-xl mt-4 max-w-md md:mx-0 mx-auto">
                    By the end of this project, you’ll have your own dynamic
                    eCommerce store with a working checkout flow.
                  </p>
                  <ul className="text-gray-200 mt-6 leading-10 list-none list-inside text-lg font-light">
                    {[
                      'Manage local state with React Hooks',
                      'Manage global state with React Context',
                      'Purchasing flow with Stripe Checkout',
                    ].map((i) => (
                      <li className="space-x-4" key={i}>
                        <span className="text-purple-300">✓</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:row-start-auto row-start-1">
                  <Image
                    className="rounded-md shadow-lg"
                    src="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1608034859/next.egghead.io/pages/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/screenshot-of-space-jelly-shop-interface.png"
                    width={1128 / 2}
                    height={698 / 2}
                    alt="a screenshot of space jelly shop interface"
                  />
                </div>
              </div>
              <div className="mt-16 font-light text-purple-200 grid md:grid-cols-5 grid-cols-2 lg:grid-rows-2 text-center max-w-screen-lg mx-auto md:gap-x-12 gap-x-3 md:gap-y-6 gap-y-5 tracking-wide">
                {[
                  'React Context API',
                  'Data Fetching',
                  'React useState',
                  'Custom React Hooks',
                  'Stripe Integration',
                  'Manage API keys',
                  'Pre-rendering',
                  'Dynamic Routing',
                  'CSS Grid',
                  'Vercel deploys',
                ].map((i) => (
                  <div className="" key={i}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </article>
        <div className="w-full mx-auto max-w-screen-lg items-center grid md:grid-cols-2 lg:gap-40 md:gap-24 gap-5">
          <Instructor instructor={data.instructor} />
          {data.podcast.id && (
            <div>
              <h3 className="text-lg font-semibold mb-2 md:text-left text-center">
                Listen to Colby tell you about this project
              </h3>
              <iframe
                height="52px"
                width="100%"
                frameBorder="no"
                scrolling="no"
                seamless
                src={`https://player.simplecast.com/${data.podcast.id}?dark=false`}
              />
            </div>
          )}
        </div>
        <Join />
      </div>
    </>
  )
}

// ——— COMPONENTS

const Join: FunctionComponent<{}> = () => {
  return (
    <div className="md:mt-24 mt-16 md:py-48 py-24 text-center bg-black text-white -mx-5 xl:px-0 px-5">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-6">
        <div>
          <Eggo className="w-16" />
        </div>
        <h2 className="lg:text-2xl  text-xl font-semibold leading-tighter max-w-2xl">
          Unlock this and all of the premium courses and content with egghead
          Pro Membership
        </h2>
        <div>
          from <strong>$20/month</strong>
        </div>
        <Link href="/pricing">
          <a className="px-6 py-4 rounded-lg font-semibold bg-blue-600 text-white transition-all ease-in-out duration-300 hover:scale-105 transform hover:bg-blue-500 hover:shadow-xl">
            Level-up your career
          </a>
        </Link>
      </div>
    </div>
  )
}

const Instructor: FunctionComponent<{
  instructor: {name: string; bio: string; path: string; image: string}
}> = ({instructor: {name, bio, path, image}}) => {
  return (
    <div className="flex flex-col space-y-2 md:items-start md:text-left text-center items-center -mt-20">
      <div className="rounded-full bg-white p-1 overflow-hidden">
        <Image
          className="rounded-full"
          src={image}
          width={160}
          height={160}
          alt="Colby Fayock"
        />
      </div>
      <div className="text-xs uppercase text-gray-600">
        Meet Your Instructor
      </div>
      <Link href={path}>
        <a className="text-lg font-semibold">{name}</a>
      </Link>
      <Markdown className="prose max-w-xl" source={bio} />
    </div>
  )
}

const Tags: FunctionComponent<{
  tags: {title: string; image: string}[]
}> = ({tags}) => {
  return (
    <div className="flex space-x-6 items-center md:justify-start justify-center">
      {tags.map((tag) => (
        <div key={tag.title} className="flex space-x-1 items-center">
          <img width={16} src={tag.image} alt={`${tag.title} logo`} />
          <span>{tag.title}</span>
        </div>
      ))}
    </div>
  )
}

const Part: FunctionComponent<{
  part: {
    title: string
    body?: string
    image: string
    lessons?: {title: string; path: string}[]
  }
  idx: number
  isLast: boolean
}> = ({part: {title, body, image, lessons}, idx, isLast = false}) => {
  const index = idx + 1
  const gap = isLast ? 'md:pb-24 pb-10' : 'pb-10'
  const FlagIcon = () => {
    return (
      //prettier-ignore
      <svg width="14" height="14" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M3 6a3 3 0 0 1 3-3h10a1 1 0 0 1 .8 1.6L14.25 8l2.55 3.4A1 1 0 0 1 16 13H6a1 1 0 0 0-1 1v3a1 1 0 1 1-2 0V6z" fill="currentColor"/></g></svg>
    )
  }
  const Thumbnail = () => {
    return image ? (
      <div className="overflow-hidden flex">
        <Image
          className="block"
          src={image}
          alt={title}
          width={202}
          height={171}
        />
      </div>
    ) : null
  }

  return (
    <div className="flex md:flex-row flex-col md:space-x-6">
      <div
        className={`space-y-2 flex flex-col md:items-end items-center py-1 ${gap}`}
      >
        {/* <div className="uppercase font-semibold text-sm text-blue-500">Part {index}</div> */}
        {lessons ? (
          <Link href={lessons[0].path}>
            <a>
              <Thumbnail />
            </a>
          </Link>
        ) : (
          <Thumbnail />
        )}
      </div>
      <div className="md:flex hidden flex-col items-center relative">
        <div className="flex items-center justify-center text-center text-xs text-gray-400 font-semibold w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0">
          <small>{index}</small>
        </div>
        <div className="border-r-2 border-gray-200 h-full" />
        {/* {isLast && (
              <div className="flex items-center justify-center text-center text-xs bg-blue-100 text-blue-500 font-semibold w-10 h-10 transform translate-y-10 absolute bottom-0 rounded-full border-none border-gray-200 flex-shrink-0">
                <FlagIcon />
              </div>
            )} */}
      </div>
      <div className={`md:w-full ${gap}`}>
        <h3 className="text-lg font-bold relative transform -translate-y-1 pb-1">
          {title}
        </h3>
        {body && <Markdown className="prose" source={body} />}
        {lessons && (
          <ul>
            {lessons.map((l) => (
              <li>
                {l.path ? (
                  <Link href={l.path}>
                    <a className="py-1 flex space-x-2 items-center text-gray-700 hover:text-blue-600 group">
                      {/* prettier-ignore */}
                      <div className="flex-shrink-0"><svg className="text-gray-400 group-hover:text-blue-600" width={18} height={18} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z" fill="currentColor"/></g></svg></div>
                      <div className="font-semibold">{l.title}</div>
                    </a>
                  </Link>
                ) : (
                  <div className="font-semibold py-1">{l.title}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default Project
