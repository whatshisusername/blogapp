import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // from the store let me know it the user is logged in or not or any user present or not
  // in authslice state have status attribute which tells user present or not
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  // below are navitems that will be present and displayed in header according to user status
  // home will always be displayed in header,login and signup will displayed iff user.status is false ie not logged in
// all post and add post will be displayed in header iff userstatus is active
// for user we have status and for navitems we have active which will tell to display that item or not if active display else not
  // slug is the url
const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {/*going loop on navitems and display that item only which are active  */}
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                
                >{item.name}
                </button>
              </li>
            ) : null
            )}
            {/* if user status is active show this logout button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header