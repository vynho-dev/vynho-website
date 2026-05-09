import type { ReactNode } from 'react'

type MediaCardProps = {
  className: string
  image?: string
  imageAlt?: string
  videoLabel?: string
  mediaClassName?: string
  imageLoading?: 'eager' | 'lazy'
  imageFetchPriority?: 'high' | 'low' | 'auto'
  videoAutoPlay?: boolean
  videoLoop?: boolean
  videoPreload?: 'none' | 'metadata' | 'auto'
  onImageLoad?: () => void
  onVideoLoadedData?: () => void
  children?: ReactNode
}

export function MediaCard({
  className,
  image,
  imageAlt = '',
  videoLabel,
  mediaClassName,
  imageLoading = 'lazy',
  imageFetchPriority = 'auto',
  videoAutoPlay = true,
  videoLoop = true,
  videoPreload = 'metadata',
  onImageLoad,
  onVideoLoadedData,
  children,
}: MediaCardProps) {
  const isVideo = Boolean(image) && /\.(mp4|webm|mov)$/i.test(image ?? '')

  return (
    <article className={className}>
      {image ? isVideo ? (
        <video
          className={mediaClassName}
          src={image}
          autoPlay={videoAutoPlay}
          muted
          loop={videoLoop}
          playsInline
          preload={videoPreload}
          aria-label={videoLabel}
          onLoadedData={onVideoLoadedData}
        />
      ) : (
        <img
          className={mediaClassName}
          src={image}
          alt={imageAlt}
          loading={imageLoading}
          fetchPriority={imageFetchPriority}
          onLoad={onImageLoad}
        />
      ) : null}
      {children}
    </article>
  )
}
