'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const BreadcrumbNav = () => {
  const pathname = usePathname()
  const [pathArray, setPathArray] = useState(null)

  useEffect(() => {
    const currentPath = pathname.split('/')
    const paths = currentPath?.map((item, index) => {
      const n = currentPath.slice(0, index)
      return {
        path: item,
        href: `${n.join('/')}/${item}`,
        key: index
      }
    })
    setPathArray(paths)
  }, [pathname])
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathArray?.map((path, index) => {
          return (index === (pathArray.length - 1) ?
            (<>
              <BreadcrumbItem key={path.key}>
                <BreadcrumbPage>{path.path}</BreadcrumbPage>
              </BreadcrumbItem>
            </>) : (
              <>
                <BreadcrumbItem key={path.key} className="hidden md:block">
                  <Link href={path.href}>{path.path}
                  </Link>
                </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
              </>
            ))
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbNav