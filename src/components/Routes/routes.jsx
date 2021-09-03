import React, { lazy ,Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../UI';
const Dashboard = lazy(()=>import('../UI/dashboard'))
const PolicyPage = lazy(()=>import('../UI/policyPage'))


const Routes = () =>{
    return <Layout>
                <Suspense fallback={
                        <div>Loading...</div>
                        }>
                        <Switch >             
                            <Route path="/dashboard" exact>
                                <Dashboard/>
                            </Route>
                            <Route path="/policy" exact>
                                <PolicyPage />
                            </Route>
                            <Route path="*" exact>
                                <Redirect to="/dashboard" />
                            </Route>
                        </Switch>
                    </Suspense>
            </Layout>
}

export default Routes