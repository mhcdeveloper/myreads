import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import './index.css'

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cjamjbbn91jfk0142jq8uh8jr'
})

const client = new ApolloClient({
    networkInterface
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter><App /></BrowserRouter>
    </ApolloProvider>, 
    document.getElementById('root')
)
