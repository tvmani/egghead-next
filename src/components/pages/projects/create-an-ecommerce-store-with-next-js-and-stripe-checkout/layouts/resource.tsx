import * as React from 'react'
import {FunctionComponent} from 'react'

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
  return (
    <>
      {/* {JSON.stringify(meta, null, 2)} */}
      <main className="max-w-screen-xl mx-auto grid grid-cols-8 gap-10 sm:pb-16 pb-8">
        <div className="col-span-2">{sidebar}</div>
        <div className="col-span-6">
          <h1 className="text-4xl font-bold tracking-tight leading-tighter mb-8">
            {meta.title}
          </h1>
          <article className="prose md-prose-lg max-w-none">{children}</article>
        </div>
      </main>
    </>
  )
}

export default ResourceLayout
