import Navbar from './NavBar'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
      <Header />
    </>
  )
}