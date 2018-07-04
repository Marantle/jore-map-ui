import {Theme, ToggleButton} from 'hsl-shared-components'
import DevTools from 'mobx-react-devtools'
import * as React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import './App.css'
import Login from './Login'
import Map from './Map'

const rootPath: string = '/'


class App extends React.Component<any, any> {

    public render(): any {
        return (
            <ThemeProvider theme={Theme}>
                <Router>
                    <div>
                        <ToggleButton title='Toggle me!' />
                        <DevTools/>
                        <Map/>
                        <nav>
                            <Link to={'/'}>/</Link>&nbsp;
                            <Link to={'/login'}>Login</Link>
                        </nav>
                        <Route exact={true} path='/' rootPath={rootPath}/>
                        <Route path='/login/' component={Login} rootPath={rootPath}/>
                    </div>
                </Router>
            </ThemeProvider>
        )
    }
}

export default App
