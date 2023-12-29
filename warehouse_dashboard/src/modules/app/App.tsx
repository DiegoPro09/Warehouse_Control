import { useAuthContext } from '../auth/AuthContext'
import { Route, Routes } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './AppRoutes'
import { AppLayout } from './layout/AppLayout'

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/'>
          {/*   RUTAS PUBLICAS   */ }
          {PUBLIC_ROUTES.map((page, index) => 
            <Route key ={index} path={page.path} element={page.component}/>
          )}

          {/* RUTAS PRIVADAS */}
          {isLoggedIn &&
              PRIVATE_ROUTES.map((page, index)=>
                <Route  
                  key={index} 
                  path={`${page.path}`} 
                  element={
                    <AppLayout children={page.component}/> 
                  } 
                />
              )}
        </Route>
      </Routes>
    </>
  )
}

export default App
