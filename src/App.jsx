import React, { useRef, useEffect, useState } from 'react'

function App() {
  const [isActive, setIsActive] = useState(false)
  const sidebarRef = useRef(null)
  const openSidebarButtonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !openSidebarButtonRef.current.contains(e.target)
      ) {
        setIsActive(isActive)
        sidebarRef.current.classList.add('-translate-x-full')
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleOpenSidebar = (e) => {
    e.stopPropagation()
    setIsActive(!isActive)
    sidebarRef.current.classList.toggle('-translate-x-full')
  }

  return (
    <div className='h-0 flex overflow-hidden w-screen '>
      <div
        className='fixed top-0 w-[300px] min-h-screen overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-300 z-10 bg-white'
        id='sidebar'
        ref={sidebarRef}
      >
        <div className='p-4'>
          <h1 className='text-2xl font-semibold'>Sidebar</h1>
          <ul className='mt-4'>
            <li className='mb-2'>
              <a href='#' className='block hover:text-indigo-400'>
                Home
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='block hover:text-indigo-400'>
                About
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='block hover:text-indigo-400'>
                Services
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='block hover:text-indigo-400'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex-1 flex flex-col overflow-hidden fixed top-0 w-screen'>
        <div className='bg-white shadow'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center py-4 px-2'>
              <p>Logo</p>
              <button
                className={`text-gray-500 hover:text-gray-600 hamburger ${
                  isActive ? 'active' : ''
                } ${isActive ? 'blue' : 'red'}`}
                id='open-sidebar'
                ref={openSidebarButtonRef}
                onClick={handleOpenSidebar}
              >
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
