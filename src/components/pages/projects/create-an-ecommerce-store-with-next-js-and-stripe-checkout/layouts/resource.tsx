import * as React from 'react'
import {FunctionComponent} from 'react'
import EggheadPlayer from 'components/EggheadPlayer'
import Transcript from 'components/pages/lessons/Transcript'
import Markdown from 'react-markdown'
import {MDXProvider} from '@mdx-js/react'
import Image from 'next/image'
import {Element, scroller} from 'react-scroll'
import Link from 'next/link'
import {useRouter} from 'next/router'

type ResourceLayoutProps = {
  children: React.ReactElement | React.ReactElement[]
  meta: any
  sidebar: React.ReactElement
}

const ResourceLayout: FunctionComponent<ResourceLayoutProps> = ({
  children,
  meta,
  sidebar,
}) => {
  const router = useRouter()
  const playerRef = React.useRef<any>(null)
  const [isPlaying, setPlaying] = React.useState<boolean>(false)

  const SeekToButton = (props: any) => {
    const match = props.href.match(
      /[0-9]:[0-9][0-9]|[0-9]{2}:[0-9][0-9]|[[0-9]{2}:[0-9][0-9]]|[[0-9]{3}:[0-9][0-9]]/g, // https://regexr.com/58bnr
    )

    const hmsToSeconds = (str: string) => {
      let p = str.split(':') || [],
        s = 0,
        m = 1

      while (p.length > 0) {
        s += m * parseInt(p.pop() as string, 10)
        m *= 60
      }
      return s
    }

    if (!match) {
      return (
        <Link href={props.href}>
          <a>{props.children}</a>
        </Link>
      )
    }
    const secondsToSeek = hmsToSeconds(
      props.href.replace('[', '').replace(']', ''),
    )
    return (
      <button
        className="inline-flex items-center transform translate-y-1"
        onClick={() => {
          const duration = playerRef.current.getDuration()
          const fractionToSeek = secondsToSeek / duration
          playerRef.current.seekTo(fractionToSeek)
          setPlaying(true)
          scroller.scrollTo('player', {
            duration: 500,
            smooth: 'easeInOutQuint',
          })
        }}
      >
        <svg
          className="hover:text-blue-700 text-blue-600"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
              fill="currentColor"
            />
          </g>
        </svg>
        <small className="text-xs font-semibold">{props.children}</small>
      </button>
    )
  }

  return (
    <>
      {/* {JSON.stringify(meta, null, 2)} */}
      <main className="sm:pb-16 pb-8 md:-mt-5">
        <article>
          <div className="mb-4">
            {meta.media_urls && (
              <section className="max-w-screen-xl mx-auto  md:rounded-b-lg overflow-hidden">
                <Element name="player" />
                <EggheadPlayer
                  {...meta.media_urls}
                  ref={playerRef}
                  playing={isPlaying}
                  width="100%"
                  height="auto"
                  pip="true"
                  controls
                  // onPlay={() => send('PLAY')}
                  // onPause={() => {send('PAUSE')}}
                  // onEnded={() => send('COMPLETE')}
                  // subtitlesUrl={get(lesson, 'subtitles_url')}
                />
              </section>
            )}
          </div>
          <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-10 py-4 relative">
            <div className="col-span-8">
              <header className="max-w-screen-xl mx-auto space-y-8 pb-12">
                {meta.title && (
                  <h1 className="text-4xl font-extrabold tracking-tight leading-tighter">
                    {meta.title}
                  </h1>
                )}
                {meta.summary && (
                  <Markdown
                    className="prose md:prose-xl font-medium"
                    source={meta.summary}
                  />
                )}
              </header>
              <div className="prose md:prose-lg max-w-none leading-tight">
                <MDXProvider
                  components={{
                    a: (props: any) => <SeekToButton {...props} />,
                  }}
                >
                  {children}
                </MDXProvider>
                {meta.transcript || meta.transcript_url ? (
                  <>
                    <hr className="border-none h-px bg-gray-200" />
                    <h4 className="font-semibold text-xl">Transcript</h4>
                    <Transcript
                      playVideo={() => setPlaying(true)}
                      className="prose sm:prose-lg max-w-none"
                      player={playerRef}
                      playerAvailable={true}
                      enhancedTranscript={meta.transcrpt_url}
                      initialTranscript={meta.transcript}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <aside className="relative col-span-4 flex flex-col space-y-8">
              <div className="sticky top-5 flex flex-col space-y-8">
                {meta.code?.github && (
                  <>
                    <a
                      href={`https://github.com/${meta.code.github.user}/${meta.code.github.repo}/tree/${meta.code.github.branch}`}
                      className="flex self-start space-x-1 items-center font-medium text-sm px-3 py-2 rounded-md bg-gray-100"
                    >
                      {/* prettier-ignore */}
                      <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path></g></svg>
                      {meta.code.label
                        ? meta.code.label
                        : 'Code for this lesson on GitHub'}
                      {/* {meta.code.github.user}/{meta.code.github.repo} */}
                    </a>
                  </>
                )}
                {sidebar}
                {meta.next && meta.next.path && (
                  <Link href={meta.next.path}>
                    <a className="px-5 py-3 font-semibold rounded-md text-white text-center bg-blue-600">
                      {meta.next.label ? meta.next.label : 'Next Lesson →'}
                      {/* {meta.next.title} */}
                    </a>
                  </Link>
                )}
                <Link href="/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout">
                  <a className="flex items-center space-x-3">
                    <Image
                      src="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1608034857/next.egghead.io/pages/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/create-an-ecommerce-store-with-next-js-and-stripe-checkout_1.png"
                      width={80}
                      height={80}
                      quality={100}
                      alt="illustration by Kamil Khadeyev"
                    />
                    <div className="leading-tight font-semibold">
                      Create an eCommerce Store with Next.js and Stripe Checkout
                    </div>
                  </a>
                </Link>
                <ul className="rounded-lg divide-gray-100 divide-y-2">
                  {resources.map((r, i) => (
                    <li
                      key={r.path}
                      className={`${
                        router.asPath.includes(r.path) ? 'bg-gray-50' : ''
                      }`}
                    >
                      <Link href={r.path}>
                        <a
                          className={`flex border-l-2 space-x-2 py-3 px-3 font-medium hover:text-blue-600 leading-tight ${
                            router.asPath === r.path
                              ? 'text-blue-600  border-blue-600'
                              : 'border-transparent'
                          }`}
                        >
                          <small
                            className={`font-medium text-xs mt-1 transform -translate-y-px ${
                              router.asPath.includes(r.path)
                                ? 'text-blue-600'
                                : ''
                            }`}
                          >
                            {i}
                          </small>
                          <span>{r.title}</span>
                        </a>
                      </Link>
                      {r.resources && (
                        <ul className="pb-2">
                          {r.resources.map((r) => (
                            <li key={r.path}>
                              <Link href={r.path}>
                                <a
                                  className={`pl-7 inline-flex py-1 px-3 hover:text-blue-600 ${
                                    router.asPath === r.path
                                      ? 'text-blue-600 font-medium'
                                      : ''
                                  }`}
                                >
                                  {r.title}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  )
}

const resources = [
  {
    title: 'Setup & Overview',
    slug: 'setup-and-overview',
    path:
      '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/setup-and-overview',
    code: '',
  },
  {
    title: 'Create a New React Application with Next.js',
    path:
      '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/create-a-new-react-application-with-next-js',
    slug: 'create-a-new-react-application-with-next-js',
    code:
      'https://github.com/colbyfayock/space-jelly-store-workshop/tree/main/lessons/01%20-%20Create%20a%20New%20React%20Application%20with%20Next.js',
    resources: [
      {
        title: 'Exercise',
        path:
          '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/create-a-new-react-application-with-next-js/intro',
        slug: 'intro',
      },
      {
        title: 'Solution',
        path:
          '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/create-a-new-react-application-with-next-js/solution',
        slug: 'solution',
      },
    ],
  },
  {
    title:
      'Add and Style a Grid of Products with Images in a Next.js React App',
    slug: 'add-and-style-a-grid-of-products-with-images-in-a-next-js-react-app',
    path:
      '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/add-and-style-a-grid-of-products-with-images-in-a-next-js-react-app',
    code: '',
  },
  {
    title:
      'Add and Configure Products in the Stripe Dashboard for an Online Store',
    slug:
      'add-and-configure-products-in-the-stripe-dashboard-for-an-online-store',
    path:
      '/projects/create-an-ecommerce-store-with-next-js-and-stripe-checkout/add-and-configure-products-in-the-stripe-dashboard-for-an-online-store',
    code: '',
  },
]

export default ResourceLayout
